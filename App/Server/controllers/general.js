import User from "../models/User.js";
import Booking from "../models/Booking.js";
import OverallStat from "../models/OverallStat.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
    try {
        const { rooms } = req.query;
        const roomsArray = rooms ? rooms.split(',') : [];
        if (!roomsArray || !Array.isArray(roomsArray)) {
            return res.status(400).json({ error: 'Invalid parameter: rooms must be an array' });
        }
        
        const bookings = await Booking.find({ roomNumber: { $in: roomsArray } });;
        res.status(200).json(bookings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const postBook = async (req, res) => {
    try {
        const { startTime, finishTime, room, name, userId, allDay } = req.body;

        const newBooking = new Booking({
            startTime,
            finishTime,
            room,
            name,
            userId,
            allDay,
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/*export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";
    

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });
      
    const overallStat = await OverallStat.find({ year: currentYear });
   
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};*/