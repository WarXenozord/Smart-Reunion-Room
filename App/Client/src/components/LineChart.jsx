import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { fetchDataFromThingSpeak } from "../state/thingspeak"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useMemo, useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { useTheme, Typography } from "@mui/material";

    
const lineData = async (deviceId, roomName, startDate, endDate, colors, booked) => {
    const num = parseInt(deviceId);
    const fieldKey = `field${num}`;
    const channel = await fetchDataFromThingSpeak(startDate, endDate);
    const filteredfeed = channel.feeds.filter(feed => feed[fieldKey] !== null);
    if (!filteredfeed) {
    var   data = [{ feed: '2024-07-05T07:46:47Z',  [fieldKey]: 0}];
    }
    var data = filteredfeed.map(feed => ({
        x: feed.created_at,
        y: feed[fieldKey]
    }));
    const now = new Date();
    const yesterday = new Date(now - 3600 * 24 * 1000);
    const firstElement = data[0];
    const startElement = { x: yesterday, y: firstElement.y };
    data.unshift(startElement);
    const lastElement = data[data.length - 1];
    const newElement = { x: now, y: lastElement.y };
    data.push(newElement);


    const used = data[data.length - 2].y === '1';
    const col = booked ? (used ? colors.blueAccent[400] : colors.redAccent[400]) : (used ? colors.greenAccent[400] : colors.yellowAccent[500]);

    return { lineData:[{ id: roomName, color: col, data: data }], used };
}

const LineChart = ({ isCustomLineColors = false, isDashboard = false, deviceId, roomName, startDate, endDate, booked }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [chartData, setChartData] = useState([]); // State for loading indicator
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [isUsed, setIsUsed] = useState(false); // State for loading indicator

       const dat = useMemo(() => {
        if (!chartData ||loading) return [];

        return chartData;
    }, [chartData]); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const fetchData = async () => {
            try {
                var { lineData: data, used } = await lineData(deviceId, roomName, startDate, endDate, colors, booked);
                console.log(data)
                setChartData(data); // Ensure chartData is an array of objects
                setLoading(false); // Set loading to false once data is loaded
                setIsUsed(used);
            } catch (error) {
                console.error('Error fetching line data:', error);
                setLoading(false); // Ensure loading state is updated on error too
            }
        };

        fetchData();
    }, [deviceId, roomName, startDate, endDate, colors, booked]);

 


    if (!dat || !chartData || loading) {
        return (
            <Box    height="250px"
                    width="calc(50% - 10px)" // 50% width minus gap
                    sx={{
                        backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : '#dcdcdc',
                        borderRadius: '10px',
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }


    const prompt = booked ? (isUsed ? 'Uso com reserva' : 'Reserva sem uso!'):(isUsed ? 'Uso sem reserva' : 'Livre');
    const now = new Date();
    const xMax = now.toISOString().slice(0, -5) + 'Z';
    const yesterday = new Date(now - 3600 * 24 * 1000);
    const xMin = yesterday.toISOString().slice(0, -5) + 'Z';

    
    return (
        <Box
            height="240px"
            width="calc(50% - 10px)" // 50% width minus gap
            sx={{
                backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : '#dcdcdc',
                borderRadius: '10px',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20%',
                marginTop: '10px', // Adjust the top margin here
                marginBottom: '10px', // Adjust the top margin here
            }}
            >
                <Typography variant="h3" color={booked ? (isUsed ? colors.blueAccent[400] : colors.redAccent[400]) : (isUsed ? colors.greenAccent[400] : colors.yellowAccent[500])}>
                    {roomName}: {prompt}
                </Typography>
            </Box>
            <Box height="200px" width='100%' sx={{
                backgroundColor: theme.palette.mode === "dark" ? colors.primary[700] : '#f2f2f2', // Change this to your desired background color
                borderRadius: '10px',
            }}>
                <ResponsiveLine
                    data={dat}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: colors.grey[100],
                                },
                            },
                            legend: {
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: colors.grey[100],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        tooltip: {
                            container: {
                                color: colors.primary[500],
                            },
                        },
                    }}
                    colors={{ datum: "color" }} // added
                    enableArea={true}
                    margin={{ top: 30, right: 50, bottom: 60, left: 60 }}
                    xScale={{
                        type: "time",
                        format: '%Y-%m-%dT%H:%M:%S%Z',
                        precision: 'minute',
                        max: xMax,
                        min: xMin,
                    }}
                    yScale={{
                        type: "linear",
                        min: 0,
                        max: 1,
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="stepAfter"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        format: '%m/%d-%H:%M',
                        tickValues: 'every 1 hour', // Adjust based on your data and desired granularity
                        legendPosition: 'middle',
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 35,
                    }}
                    axisLeft={{
                        orient: "left",
                        tickValues: 1, // added
                        tickSize: 3,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : "Ocupação", // added
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={8}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    enablePoints={false}

                />
            </Box>
        </Box>
    );
};

export default LineChart;

/*
legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: -15,
          translateY: -35,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}*/
