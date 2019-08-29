-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 29, 2019 at 07:45 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `record_repo`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartItems`
--

CREATE TABLE `cartItems` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `productID` mediumint(8) UNSIGNED NOT NULL,
  `count` smallint(5) UNSIGNED NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `added` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cartID` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `products_id` mediumint(8) UNSIGNED NOT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `products_id`, `url`) VALUES
(1, 1, '/images/ajikan.jpg'),
(2, 1, '/images/ajikan1.jpg'),
(3, 2, '/images/meta.jpg'),
(4, 2, '/images/meta1.jpg'),
(5, 3, '/images/dizzy.jpg'),
(6, 3, '/images/dizzy1.jpg'),
(7, 4, '/images/shishamo.jpg'),
(8, 4, '/images/shishamo1.jpg'),
(9, 5, '/images/glim.jpg'),
(10, 5, '/images/glim1.jpg'),
(11, 6, '/images/tricot.jpg'),
(12, 6, '/images/tricot1.jpg'),
(13, 7, '/images/road.jpg'),
(14, 7, '/images/road1.jpg'),
(15, 8, '/images/sun.jpg'),
(16, 8, '/images/sun1.jpg'),
(17, 1, '/images/ajikan2.jpg'),
(18, 2, '/images/meta2.jpg'),
(19, 3, '/images/dizzy2.jpg'),
(20, 4, '/images/shishamo2.jpg'),
(21, 5, '/images/glim2.jpg'),
(22, 6, '/images/tricot2.jpg'),
(23, 7, '/images/road2.jpg'),
(24, 8, '/images/sun2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `zip` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `credit_card` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `order_items` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `artist` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `price` smallint(30) UNSIGNED NOT NULL,
  `image` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `artist`, `price`, `image`, `description`) VALUES
(1, 'Sol-fa', 'Asian Kung-Fu Generation', 1999, '/images/ajikan.jpg', 'Sol-fa is the second studio album by Japanese rock band, Asian Kung-Fu Generation, released on October 20, 2004.'),
(2, 'metaphorical music', 'Nujabes', 2999, '/images/meta.jpg', 'Metaphorical Music is Nujabes\' first solo album released in 2003. It offers a combination of hip hop and instrumental jazz, and features artists like Shing02, Substantial, Five Deez and Cise Starr (of CYNE). Despite the fact that the album has contributing vocals from several artists, it is roughly classified as a breakbeat album.'),
(3, 'Sunplugged vol.2', 'Dizzy Sunfist', 499, '/images/dizzy.jpg', 'Dizzy Sunfist\'s 2nd all-acoustic CD! Experience a lighter side of the band\'s usual blistering punk rock as they offer acoustic re-imaginings of their original songs.'),
(4, 'SHISHAMO', 'SHISHAMO', 1999, '/images/shishamo.jpg', 'Debut album of 3 piece rock band SHISHAMO, formed in the high school light music club in Kawasaki city.'),
(5, 'Orokamonotachi', 'Glim Spanky', 899, '/images/glim.jpg', 'Remi Matsuo\'s husky shout, Kamemoto Hiroki\'s emotional guitar shines, and the vintage texture sounds lively in this hard-rock single.'),
(6, '3', 'tricot', 1899, '/images/tricot.jpg', '3 is the third studio album by math rock band Tricot. It was released on May 17, 2017, released under the record label Topshelf Records. The album received generally positive reviews from critics and fans alike, praising its accessibility while still maintaining the complexities of math rock.'),
(7, 'Making the Road', 'Hi-Standard', 666, '/images/road.jpg', 'Packing more punch than a mouthful of wasabi, Hi-Standard\'s third FAT album is sure to delight fans of Japan\'s favorite punk all stars. Contains bonus tracks not available on the Japanese release!'),
(8, 'Sun', 'Hoshino Gen', 499, '/images/sun.jpg', 'Hoshino Gen Hajime\'s first drama tie-up single \"SUN\" (Fuji TV series April Cool Water 10 drama \"Mind is Pokkitsune\" theme song) 7-inch analog board is released simultaneously.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cartItems`
--
ALTER TABLE `cartItems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cartproductid` (`productID`,`cartID`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products` (`products_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cartItems`
--
ALTER TABLE `cartItems`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `products` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
