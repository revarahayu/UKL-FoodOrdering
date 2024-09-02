-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2024 at 12:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food-ordering`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `nama_admin` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id_admin`, `nama_admin`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(3, 'rere', 'reva@gmail.com', '123', '2024-05-06 05:42:04', '2024-05-06 05:42:04'),
(4, 'rere', 'reva@gmail.com', '111', '2024-05-06 06:45:08', '2024-05-06 08:44:26'),
(5, 'ratih', 'ratih@gmail.com', '12345', '2024-05-07 01:03:30', '2024-05-07 01:03:30');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id_food` int(11) NOT NULL,
  `nama_food` varchar(255) DEFAULT NULL,
  `spicy_level` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id_food`, `nama_food`, `spicy_level`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Chicken Wings', 'super spicy', 25000, 'image-1715051019492-firewings.jpg', '2024-05-06 02:06:43', '2024-05-07 03:03:39'),
(5, 'Chicken Wings', 'medium', 20000, 'image-1714985033165-chickenwings.jpg', '2024-05-06 08:43:53', '2024-05-06 08:43:53'),
(6, 'Chicken Drumstick', 'Extra Hot', 20000, 'image-1714997350216-spicydrumstick.jpg', '2024-05-06 12:09:10', '2024-05-06 12:09:10'),
(7, 'Chicken Drumstick', 'Extra Hot', 20000, 'image-1715043981435-spicydrumstick.jpg', '2024-05-07 01:06:21', '2024-05-07 01:06:21');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id_order_detail` int(11) NOT NULL,
  `id_order_list` int(11) DEFAULT NULL,
  `id_food` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id_order_detail`, `id_order_list`, `id_food`, `jumlah`, `price`, `createdAt`, `updatedAt`) VALUES
(2, 2, 1, 2, 25000, '2024-05-06 07:37:59', '2024-05-06 07:37:59'),
(5, 5, 1, 2, 25000, '2024-05-06 12:14:49', '2024-05-06 12:14:49'),
(6, 5, 6, 5, 20000, '2024-05-06 12:14:49', '2024-05-06 12:14:49'),
(7, 6, 5, 2, 20000, '2024-05-06 12:16:39', '2024-05-06 12:16:39'),
(8, 6, 6, 5, 20000, '2024-05-06 12:16:39', '2024-05-06 12:16:39'),
(9, 7, 1, 2, 25000, '2024-05-06 12:17:41', '2024-05-06 12:17:41'),
(10, 7, 6, 5, 20000, '2024-05-06 12:17:41', '2024-05-06 12:17:41'),
(11, 8, 1, 2, 25000, '2024-05-07 01:09:28', '2024-05-07 01:09:28'),
(12, 8, 6, 5, 20000, '2024-05-07 01:09:28', '2024-05-07 01:09:28'),
(13, 9, 1, 2, 25000, '2024-05-07 01:13:07', '2024-05-07 01:13:07'),
(15, 13, 1, 1, 25000, '2024-05-08 00:27:59', '2024-05-08 00:27:59'),
(16, 14, 1, 1, 25000, '2024-05-08 01:35:50', '2024-05-08 01:35:50');

-- --------------------------------------------------------

--
-- Table structure for table `order_lists`
--

CREATE TABLE `order_lists` (
  `id_order_list` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `table_number` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `status` enum('belum_bayar','lunas') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_lists`
--

INSERT INTO `order_lists` (`id_order_list`, `customer_name`, `table_number`, `order_date`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 'Rere', '1', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-06 07:37:59', '2024-05-06 07:37:59'),
(5, 'Rere', '1', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-06 12:14:49', '2024-05-06 12:14:49'),
(6, 'Rere', '2', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-06 12:16:39', '2024-05-06 12:16:39'),
(7, 'jasmine', '2', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-06 12:17:41', '2024-05-06 12:17:41'),
(8, 'jasmine', '2', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-07 01:09:28', '2024-05-07 01:09:28'),
(9, 'ratih', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-07 01:13:07', '2024-05-07 01:13:07'),
(11, 'ratih', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 00:26:33', '2024-05-08 00:26:33'),
(12, 'ratih', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 00:26:38', '2024-05-08 00:26:38'),
(13, 'REVA RAHAYU', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 00:27:59', '2024-05-08 00:27:59'),
(14, 'REREEEE', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 01:35:50', '2024-05-08 01:35:50'),
(15, 'REREEEE', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 01:36:01', '2024-05-08 01:36:01'),
(16, 'REREEEE', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 01:42:41', '2024-05-08 01:42:41'),
(17, 'REREEEE', '9', '2024-05-01 00:00:00', 'belum_bayar', '2024-05-08 01:42:49', '2024-05-08 01:42:49');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240506004838-create-admin.js'),
('20240506005403-create-food.js'),
('20240506005946-create-order-list.js'),
('20240506010529-create-order-detail.js'),
('20240506011318-create-admin.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id_food`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id_order_detail`);

--
-- Indexes for table `order_lists`
--
ALTER TABLE `order_lists`
  ADD PRIMARY KEY (`id_order_list`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id_food` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id_order_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order_lists`
--
ALTER TABLE `order_lists`
  MODIFY `id_order_list` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
