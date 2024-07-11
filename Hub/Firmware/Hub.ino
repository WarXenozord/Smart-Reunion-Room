#include <ld2410.h>
#include <WiFi.h>
#include "ThingSpeak.h"

const char* ssid = "ITACube";   // your network SSID (name) 
const char* password = "Aitacube2024";   // your network password

WiFiClient  client;

unsigned long myChannelNumber = 2505823;
const char * myWriteAPIKey = "5LVNDBJDO6B8YEKM";

// Timer variables
unsigned long lastTime = 0;
unsigned long timerDelay = 30000;

#define DECODE_NEC          // Includes Apple and Onkyo

#define RADAR_RX_PIN 16
#define RADAR_TX_PIN 17
#define RECV_PIN 34
#define TRANSMIT_PIN 22
#define BUTTON_PIN 36
#define LED_PIN 33
#define LEDR_PIN 25

#define MARK_EXCESS_MICROS    20
#define DELAY_BETWEEN_REPEAT 50
#define RAW_BUFFER_LENGTH  750

#include <IRremote.hpp>

struct storedIRDataStruct {
    IRData receivedIRData;
    // extensions for sendRaw
    uint8_t rawCode[RAW_BUFFER_LENGTH]; // The durations if raw
    uint8_t rawCodeLength; // The length of the code
} sStoredIRData[2];

ld2410 radar;
IRrecv irrecv(RECV_PIN);

uint32_t lastReading = 0;
bool radarConnected = false;
volatile bool buttonPres = false;
bool airOn = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial2.begin(256000, SERIAL_8N1, RADAR_RX_PIN, RADAR_TX_PIN);
  if(radar.begin(Serial2))
    Serial.println(F("OK"));
  else
    Serial.println(F("not connected"));

  WiFi.mode(WIFI_STA);   
  ThingSpeak.begin(client);  // Initialize ThingSpeak

  pinMode(32, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(LEDR_PIN, OUTPUT);
  //attachInterrupt(BUTTON_PIN , buttonInterrupt, FALLING); 
  IrReceiver.begin(RECV_PIN, ENABLE_LED_FEEDBACK); // Start the receiver
  IrReceiver.stop();
  IrSender.begin(TRANSMIT_PIN);
}

void loop() {
  if(digitalRead(32))
  {
    digitalWrite(LED_PIN, HIGH);
    sendCode(&(sStoredIRData[1]));
    delay(1000);
    digitalWrite(LED_PIN, LOW);
  }
  if(buttonPres){
    IrReceiver.start();
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(LEDR_PIN, LOW);
    digitalWrite(LEDR_PIN, LOW);

    decode_results results;
    //Record ON
    while(!IrReceiver.decode()){delay(1000);Serial.println("no Code");}
    storeCode(true);

    digitalWrite(LED_PIN, LOW);
    digitalWrite(LEDR_PIN, HIGH);
    delay(500);
    digitalWrite(LEDR_PIN, LOW);
    delay(500);
    digitalWrite(LEDR_PIN, HIGH);
    delay(500);
    digitalWrite(LEDR_PIN, LOW);

    IrReceiver.resume();
    digitalWrite(LED_PIN, HIGH);
    //Record OFF
    while(!IrReceiver.decode()){delay(100);}
    storeCode(false);

    digitalWrite(LEDR_PIN, LOW);
    digitalWrite(LED_PIN, LOW);
    delay(1000);
    buttonPres = false;
    IrReceiver.stop();
    airOn = false;
  }else{
    radar.read();
    if(radar.isConnected() && millis() - lastReading > 1000)  //Report every 1000ms
    {
      lastReading = millis();
      if(radar.presenceDetected())
      {
        if(radar.stationaryTargetDetected())
        {
          digitalWrite(LED_PIN, HIGH);
          Serial.print(F("Stationary target: "));
          Serial.print(radar.stationaryTargetDistance());
          Serial.print(F("cm energy:"));
          Serial.print(radar.stationaryTargetEnergy());
          Serial.print(' ');
        }else{
          digitalWrite(LED_PIN, LOW);
        }

        if(radar.movingTargetDetected())
        {
          digitalWrite(LEDR_PIN, HIGH);
          Serial.print(F("Moving target: "));
          Serial.print(radar.movingTargetDistance());
          Serial.print(F("cm energy:"));
          Serial.print(radar.movingTargetEnergy());
        }else{
          digitalWrite(LEDR_PIN, LOW);
        }
        Serial.println();
        if(!airOn){
          Serial.println("turning Air on");
          sendCode(&(sStoredIRData[1]));
          airOn= true;
        
          if(WiFi.status() != WL_CONNECTED){
            Serial.print("Attempting to connect");
            while(WiFi.status() != WL_CONNECTED){
              Serial.println(WiFi.begin(ssid, password)); 
              delay(1000); 
            }
          }
          int x = ThingSpeak.writeField(myChannelNumber, 1, 1, myWriteAPIKey);

          if(x == 200){
            Serial.println("Channel update successful.");
          }else{
            Serial.println("Problem updating channel. HTTP error code " + String(x));
          }    
        }
      }
      else
      {
        if(airOn){
          sendCode(&(sStoredIRData[0]));
          airOn= false;

          if(WiFi.status() != WL_CONNECTED){
            Serial.print("Attempting to connect");
            while(WiFi.status() != WL_CONNECTED){
              WiFi.begin(ssid, password); 
              delay(1000); 
            }
          }
          int x = ThingSpeak.writeField(myChannelNumber, 1, 0, myWriteAPIKey);

          if(x == 200){
            Serial.println("Channel update successful.");
          }else{
            Serial.println("Problem updating channel. HTTP error code " + String(x));
          }  
        }   
        Serial.println("\nConnected.");
        digitalWrite(LEDR_PIN, LOW);
        Serial.println(F("No target"));
      }
  }}
}
// Stores the code for later playback in sStoredIRData
// Most of this code is just logging
void storeCode(bool On) {
    if (IrReceiver.decodedIRData.rawDataPtr->rawlen < 4) {
        return;
    }
    if (IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT) {
        return;
    }
    if (IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_AUTO_REPEAT) {
        return;
    }
    if (IrReceiver.decodedIRData.flags & IRDATA_FLAGS_PARITY_FAILED) {
        return;
    }
    /*
     * Copy decoded data
     */
    (sStoredIRData[On]).receivedIRData = IrReceiver.decodedIRData;

    if ((sStoredIRData[On]).receivedIRData.protocol == UNKNOWN) {
        (sStoredIRData[On]).rawCodeLength = IrReceiver.decodedIRData.rawDataPtr->rawlen - 1;
        /*
         * Store the current raw data in a dedicated array for later usage
         */
        IrReceiver.compensateAndStoreIRResultInArray((sStoredIRData[On]).rawCode);
    } else {
        (sStoredIRData[On]).receivedIRData.flags = 0; // clear flags -esp. repeat- for later sending
    }
    Serial.println((sStoredIRData[On]).rawCodeLength);
}

void sendCode(storedIRDataStruct *aIRDataToSend) {
    if (aIRDataToSend->receivedIRData.protocol == UNKNOWN /* i.e. raw */) {
        // Assume 38 KHz
        IrSender.sendRaw(aIRDataToSend->rawCode, aIRDataToSend->rawCodeLength, 38);

    } else {

        /*
         * Use the write function, which does the switch for different protocols
         */
        IrSender.write(&aIRDataToSend->receivedIRData);
    }
}

void buttonInterrupt(){
  buttonPres = true;
  Serial.println("interrupt!");
}