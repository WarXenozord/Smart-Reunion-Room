import { Box } from "@mui/material";
import Header from "../../components/Header";
import CorrelationAnalyzer from '../../appLets/correlationAnalyser';

const roomUsageData = [
    {
        "time": "2024-11-16 16:20:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-16 19:09:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-16 21:55:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-17 09:48:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-17 12:38:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-17 15:11:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-17 18:07:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-17 20:07:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-18 09:57:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-18 12:37:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-18 15:30:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-18 17:33:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-18 20:07:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-19 10:00:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-19 12:29:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-19 14:45:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-19 17:14:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-19 19:21:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-19 22:18:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-20 10:21:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-20 12:59:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-20 15:21:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-20 17:45:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-20 20:31:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-21 09:58:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-21 12:00:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-21 14:11:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-21 16:44:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-21 19:36:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-21 22:24:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-22 10:34:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-22 12:37:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-22 14:52:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-22 17:02:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-22 19:19:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-22 21:30:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-23 09:34:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-23 11:42:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-23 13:59:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-23 16:31:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-23 19:08:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-23 22:04:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-24 10:33:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-24 13:05:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-24 15:37:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-24 18:34:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-24 21:04:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-25 10:16:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-25 12:52:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-25 15:14:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-25 17:21:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-25 19:46:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-25 21:57:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-26 09:22:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-26 11:57:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-26 14:37:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-26 16:51:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-26 19:46:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-26 21:53:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-27 09:53:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-27 12:03:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-27 14:57:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-27 17:36:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-27 19:58:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-27 22:18:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-28 09:34:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-28 11:44:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-28 14:25:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-28 17:05:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-28 19:32:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-28 22:20:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-29 10:31:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-29 13:27:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-29 16:02:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-29 18:35:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-29 21:01:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-30 10:04:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-30 12:17:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-30 14:30:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-30 16:30:00 UTC",
        "value": false
    },
    {
        "time": "2024-11-30 19:20:00 UTC",
        "value": true
    },
    {
        "time": "2024-11-30 21:56:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-01 10:25:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-01 12:53:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-01 15:21:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-01 18:10:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-01 20:29:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-02 09:26:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-02 12:20:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-02 14:27:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-02 16:59:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-02 19:55:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-02 22:21:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-03 09:43:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-03 12:31:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-03 14:55:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-03 17:35:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-03 20:08:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-04 10:10:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-04 12:49:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-04 14:56:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-04 17:24:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-04 19:48:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-04 21:52:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-05 09:45:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-05 12:25:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-05 14:30:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-05 16:56:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-05 19:07:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-05 21:44:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-06 10:20:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-06 12:48:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-06 14:48:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-06 17:01:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-06 19:04:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-06 21:37:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-07 10:06:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-07 12:38:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-07 15:26:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-07 17:45:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-07 19:47:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-07 22:35:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-08 09:52:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-08 12:43:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-08 15:30:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-08 18:15:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-08 20:25:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-09 09:39:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-09 12:36:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-09 14:56:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-09 17:07:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-09 19:08:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-09 21:33:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-10 09:36:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-10 11:56:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-10 14:26:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-10 17:06:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-10 19:39:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-10 21:47:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-11 09:42:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-11 11:53:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-11 14:02:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-11 16:53:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-11 19:02:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-11 21:02:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-12 09:24:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-12 11:57:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-12 14:38:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-12 17:02:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-12 19:06:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-12 21:35:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-13 10:13:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-13 12:18:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-13 14:43:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-13 17:27:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-13 20:08:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-14 10:30:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-14 13:13:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-14 16:00:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-14 18:49:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-14 21:30:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-15 10:33:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-15 13:11:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-15 15:56:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-15 17:58:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-15 20:00:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-16 09:54:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-16 12:42:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-16 14:51:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-16 17:03:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-16 19:45:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-16 21:48:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-17 09:55:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-17 12:23:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-17 14:26:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-17 17:17:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-17 19:31:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-17 21:45:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-18 10:11:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-18 12:45:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-18 14:48:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-18 17:08:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-18 19:59:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-18 22:13:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-19 09:21:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-19 12:06:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-19 14:35:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-19 16:43:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-19 19:01:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-19 21:22:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-20 09:30:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-20 11:35:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-20 13:51:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-20 16:38:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-20 18:45:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-20 20:53:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-21 09:46:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-21 12:07:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-21 14:53:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-21 17:26:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-21 19:43:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-21 21:51:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-22 09:57:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-22 12:03:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-22 14:22:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-22 16:54:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-22 19:14:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-22 21:45:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-23 09:48:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-23 12:33:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-23 14:56:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-23 17:18:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-23 20:09:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-24 10:41:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-24 13:01:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-24 15:37:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-24 17:56:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-24 20:39:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-25 10:08:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-25 12:51:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-25 15:08:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-25 17:24:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-25 19:56:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-25 22:43:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-26 09:47:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-26 11:53:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-26 14:35:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-26 17:12:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-26 19:27:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-26 22:15:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-27 10:32:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-27 12:35:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-27 14:48:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-27 17:26:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-27 19:32:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-27 22:15:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-28 09:53:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-28 12:07:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-28 14:23:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-28 16:50:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-28 19:35:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-28 22:15:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-29 10:16:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-29 12:38:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-29 15:07:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-29 17:39:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-29 19:40:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-29 22:04:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-30 10:03:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-30 13:00:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-30 15:07:00 UTC",
        "value": true
    },
    {
        "time": "2024-12-30 17:37:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-30 20:03:00 UTC",
        "value": false
    },
    {
        "time": "2024-12-31 10:13:00 UTC",
        "value": true
    },
];

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Smart Analysis" subtitle="Ferramentas poderosas para gerar métricas da sua organização." />
      <Box height="75vh">
        <CorrelationAnalyzer roomUsageData={roomUsageData} />
      </Box>
    </Box>
  );
};

export default Pie;
