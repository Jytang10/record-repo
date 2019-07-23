-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 23, 2019 at 10:58 PM
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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `artist` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `price` smallint(30) UNSIGNED NOT NULL,
  `image` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `quantity` smallint(30) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `artist`, `price`, `image`, `description`, `quantity`) VALUES
(1, 'Sol-fa', 'Asian Kung-Fu Generation', 1999, '/images/ajikan.jpg', 'Sol-fa is the second studio album by Japanese rock band, Asian Kung-Fu Generation, released on October 20, 2004.', 0),
(2, 'metaphorical music', 'Nujabes', 2999, '/images/meta.jpg', 'Metaphorical Music is Nujabes\' first solo album released in 2003. It offers a combination of hip hop and instrumental jazz, and features artists like Shing02, Substantial, Five Deez and Cise Starr (of CYNE). Despite the fact that the album has contributing vocals from several artists, it is roughly classified as a breakbeat album.', 0),
(3, 'Sunplugged vol.2', 'Dizzy Sunfist', 499, '/images/dizzy.jpg', 'Dizzy Sunfist\'s 2nd all-acoustic CD! Experience a lighter side of the band\'s usual blistering punk rock as they offer acoustic re-imaginings of their original songs.', 0),
(4, 'SHISHAMO', 'SHISHAMO', 1999, '/images/shishamo.jpg', 'Debut album of 3 piece rock band SHISHAMO, formed in the high school light music club in Kawasaki city.', 0),
(5, 'Orokamonotachi', 'Glim Spanky', 899, '/images/glim.jpg', 'Remi Matsuo\'s husky shout, Kamemoto Hiroki\'s emotional guitar shines, and the vintage texture sounds lively in this hard-rock single.', 0),
(6, '3', 'tricot', 1899, '/images/tricot.jpg', '3 is the third studio album by math rock band Tricot. It was released on May 17, 2017, released under the record label Topshelf Records. The album received generally positive reviews from critics and fans alike, praising its accessibility while still maintaining the complexities of math rock.', 0),
(7, 'Making the Road', 'Hi-Standard', 666, '/images/road.jpg', 'Packing more punch than a mouthful of wasabi, Hi-Standard\'s third FAT album is sure to delight fans of Japan\'s favorite punk all stars. Contains bonus tracks not available on the Japanese release!', 0),
(8, 'Sun', 'Hoshino Gen', 499, '/images/sun.jpg', 'Hoshino Gen Hajime\'s first drama tie-up single \"SUN\" (Fuji TV series April Cool Water 10 drama \"Mind is Pokkitsune\" theme song) 7-inch analog board is released simultaneously.', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
