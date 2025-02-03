-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 01:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emoji_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `senderId` varchar(100) NOT NULL,
  `receiverId` varchar(100) NOT NULL,
  `sendTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `receiveTime` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`message`, `senderId`, `receiverId`, `sendTime`, `receiveTime`) VALUES
('👋', 'sakshi@gmail.com', 'piyush@gmail.com', '2024-11-27 21:07:02', NULL),
('❓❓❓', 'sakshi@gmail.com', 'piyush@gmail.com', '2024-11-27 21:07:06', NULL),
('🌅🕰️', 'sakshi@gmail.com', 'piyush@gmail.com', '2024-11-27 21:07:13', NULL),
('❓❓❓', 'sakshi@gmail.com', 'dakshita@gmail.com', '2024-11-27 21:07:18', NULL),
('👋', 'sakshi@gmail.com', 'dakshita@gmail.com', '2024-11-27 21:07:25', NULL),
('🌅🔴', 'sakshi@gmail.com', 'dakshita@gmail.com', '2024-11-27 21:07:33', NULL),
('👋', 'abhayPratapSingh@gmail.com', 'dakshita@gmail.com', '2024-11-27 21:14:20', NULL),
('🐘', 'abhayPratapSingh@gmail.com', 'piyush@gmail.com', '2024-11-27 21:14:30', NULL),
('❓❓❓', 'abhayPratapSingh@gmail.com', 'sakshi@gmail.com', '2024-11-27 21:14:39', NULL),
('❓❓❓', 'abhayPratapSingh@gmail.com', 'sakshi@gmail.com', '2024-11-27 21:14:50', NULL),
('👍🌅', 'abhayPratapSingh@gmail.com', 'sakshi@gmail.com', '2024-11-27 21:14:58', NULL),
('👋', 'sakshi@gmail.com', 'abhayPratapSingh@gmail.com', '2024-11-27 21:15:32', NULL),
('🌅', 'abhayPratapSingh@gmail.com', 'sakshi@gmail.com', '2024-11-27 21:15:42', NULL),
('🕰️', 'sakshi@gmail.com', 'abhayPratapSingh@gmail.com', '2024-11-27 21:15:50', NULL),
('😁', 'abhayPratapSingh@gmail.com', 'piyush@gmail.com', '2024-11-27 21:16:21', NULL),
('😢😭', 'abhayPratapSingh@gmail.com', 'piyush@gmail.com', '2024-11-27 21:16:30', NULL),
('😂', 'abhayPratapSingh@gmail.com', 'piyush@gmail.com', '2024-11-27 21:16:35', NULL),
('👋', 'abhay@gmail.com', 'sakshi@gmail.com', '2024-11-27 22:50:03', NULL),
('👍🌅', 'abhay@gmail.com', 'sakshi@gmail.com', '2024-11-27 22:50:08', NULL),
('👋', 'sakshi@gmail.com', 'abhay@gmail.com', '2024-11-27 22:50:29', NULL),
('❓❓❓', 'sakshi@gmail.com', 'abhay@gmail.com', '2024-11-27 22:50:35', NULL),
('👋', 'abhay@gmail.com', 'sakshi@gmail.com', '2024-11-28 00:41:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `id1` varchar(100) DEFAULT NULL,
  `id2` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `friend`
--

INSERT INTO `friend` (`id1`, `id2`) VALUES
('sakshi@gmail.com', 'piyush@gmail.com'),
('sakshi@gmail.com', 'dakshita@gmail.com'),
('abhayPratapSingh@gmail.com', 'sakshi@gmail.com'),
('abhayPratapSingh@gmail.com', 'piyush@gmail.com'),
('abhayPratapSingh@gmail.com', 'dakshita@gmail.com'),
('abhay@gmail.com', 'sakshi@gmail.com'),
('abhay@gmail.com', 'piyush@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phoneNumber` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `phoneNumber`) VALUES
('abhay@gmail.com', 'Abhay Pratap Singh', '123123123', 2147483647),
('abhayPratapSingh@gmail.com', 'Abhay Pratap Singh', '123123123', 2147483647),
('dakshita@gmail.com', 'Dakshita Pandey', '123123213', 1231231231),
('piyush@gmail.com', 'Piyush Amola', '123123123', 1231231231),
('sakshi@gmail.com', 'Sakshi Rawat', '123123123', 1231231231);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
