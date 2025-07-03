-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2025 at 10:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `harmedic`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `image`, `views`, `status`, `created_at`, `author_id`) VALUES
(1, 'What Is the \"Disney\" Rash?', 'The Disney rash, also known as exercise-induced vasculitis, is a skin condition that appears after prolonged physical activity in hot weather, such as walking all day in a theme park. It usually shows as red spots, swelling, or patches on the lower legs, ankles, or calves. Though it may look alarming, it\'s not dangerous and often goes away on its own in a few days. It is caused by increased blood flow and heat exposure that irritates small blood vessels in the skin. The Disney rash is not an infection and isn\'t contagious. Basic treatment includes elevating the legs, applying cold compresses, and using anti-inflammatory creams. To prevent it, stay hydrated, wear breathable clothing, and take breaks during long walks in hot weather.', 'harmedic-1.png', 6, 'approved', '2025-06-30 23:00:18', 2),
(2, 'Our Team’s Tips for Work-Life Balance', 'Maintaining work-life balance is key to mental health and productivity. Our team recommends setting clear work hours, creating realistic daily to-do lists, and learning to say no to non-urgent tasks. Don’t forget the importance of rest, regular exercise, and keeping a social life outside of work. Setting up a dedicated workspace away from your rest area helps with focus and reduces fatigue. Technology tools like time-tracking apps or digital calendars can keep your schedule organized. Most importantly, remember that life quality is not just about career success but also about personal happiness and overall well-being.', 'harmedic-2.png', 5, 'approved', '2025-06-30 23:00:37', 2),
(3, 'Pressure Points for Relieving Constipation', 'Acupressure can help stimulate digestion and relieve constipation by applying pressure to specific points on the body. Common pressure points include ST25 (about two fingers from the belly button), SP15 (on the sides of the abdomen), and LI4 (between the thumb and index finger). Press each point for 1-2 minutes while breathing deeply. Though results vary, this natural method is generally safe and low-risk. For best results, combine with fiber-rich foods, adequate hydration, and light activity like walking. If constipation lasts for several days or comes with other symptoms, consult a doctor for proper evaluation.', 'harmedic-3.png', 0, 'rejected', '2025-06-30 23:00:49', 2),
(4, 'When Is the Best Time to Take Vitamins', 'The best time to take vitamins depends on their type. Fat-soluble vitamins like A, D, E, and K are best taken with meals that contain fat for proper absorption. Water-soluble vitamins like C and B-complex are usually best taken on an empty stomach, such as in the morning. Avoid taking vitamins with coffee or tea, as caffeine may interfere with nutrient absorption. For iron supplements, take them on an empty stomach with water or orange juice since vitamin C enhances absorption. Consistency is more important than timing, so choose a schedule you can follow. If you’re on medication, ask your doctor or pharmacist about possible interactions.', 'harmedic-4.png', 4, 'approved', '2025-06-30 23:01:14', 4),
(5, 'Shaking Hands: What Are My Treatment Options?', 'Shaking hands or tremors can be caused by stress, too much caffeine, side effects from medication, or medical conditions like essential tremor or Parkinson’s disease. Mild tremors may improve by reducing stress, cutting caffeine, and getting proper rest. If the tremor interferes with daily activities, doctors may prescribe medications like propranolol or primidone. Physical therapy can also help strengthen muscles and improve control. For severe cases unresponsive to treatment, procedures like deep brain stimulation may be considered. Getting an accurate diagnosis is essential for effective treatment. If you have ongoing hand tremors without a clear cause, seek medical advice.', 'harmedic-5.png', 3, 'approved', '2025-06-30 23:01:30', 4),
(6, 'Stretching Exercises for Older Adults to Improve Mobility', 'Regular stretching helps older adults maintain flexibility, prevent injury, and improve daily mobility. Simple exercises such as neck stretches, shoulder rolls, ankle circles, and hamstring stretches can be done at home without equipment. Ideally, stretch after a short warm-up like walking in place for five minutes. Hold each stretch for 15–30 seconds and repeat two to three times. Focus on tight areas like the back, hips, and shoulders. Move slowly and avoid stretches that cause pain. Those with medical conditions should consult a physical therapist first. Consistent stretching supports independence and a higher quality of life for seniors.', 'harmedic-6.png', 2, 'approved', '2025-06-30 23:01:45', 4),
(7, 'How Does Botox Affect Muscles?', 'Botox, or botulinum toxin, works by blocking nerve signals to specific muscles, causing temporary muscle relaxation and stopping contractions. This makes it effective for reducing facial wrinkles, treating muscle spasms, chronic migraines, and excessive sweating. At the muscle level, Botox prevents the release of acetylcholine, a neurotransmitter needed for muscle movement. Effects typically last 3 to 6 months, depending on the treatment area and individual metabolism. Repeated use may cause long-term muscle weakness if not spaced properly. Botox should only be injected by medical professionals to ensure correct dosage and safe placement. Common side effects are mild, such as bruising or slight pain at the injection site.', 'harmedic-7.png', 1, 'approved', '2025-06-30 23:02:10', 5),
(8, 'What Vitamins, Foods, and Drinks Should You Avoid with Hypothyroidism?', 'People with hypothyroidism need to watch their diet, as certain foods and supplements can interfere with thyroid function or medication absorption. Avoid excess soy, as isoflavones may affect hormone activity. Goitrogenic vegetables like broccoli, cabbage, and cauliflower should be cooked before eating. Iron, calcium supplements, and antacids containing aluminum can reduce levothyroxine absorption if taken at the same time. Coffee and tea may also affect how well the medication works, so wait 30–60 minutes after taking your thyroid medicine before drinking them. Aim for a balanced diet with enough iodine, selenium, and zinc as recommended by your doctor. Consult a nutritionist to tailor your diet for optimal thyroid health.', 'harmedic-8.png', 0, 'pending', '2025-06-30 23:02:26', 5),
(9, '7 Strategies to Help You Stay Awake During the Day', 'Daytime sleepiness can reduce focus and productivity. To stay awake, ensure you get enough sleep at night and avoid heavy, sugary meals at lunch. Move around every hour to boost circulation and alertness. Drink enough water to avoid dehydration-related fatigue. Listening to upbeat music, getting natural sunlight, and adjusting room temperature can also help. If needed, drink caffeine in moderation, preferably in the morning or early afternoon to avoid disrupting nighttime sleep. Persistent sleepiness may be a sign of underlying issues like sleep apnea or insomnia, so consult a doctor if the problem continues.', 'harmedic-9.png', 0, 'rejected', '2025-06-30 23:02:41', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','author','visitor') NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@harmedic.com', 'scrypt:32768:8:1$9nkFhHazgCAPrQVd$f9a5765eca4aa1f72fae443ea9e3a407e198ea259e16b2e5d903e01d857e32e8cf0a90e53bc2c448e3223d7c29dd10652868fc19246e4ea75b11f372e771d223', 'admin', '2025-06-30 22:33:50'),
(2, 'penulis', 'penulis@harmedic.com', 'scrypt:32768:8:1$jVExOZ7eLlEHVr66$e2f6b8498a157c1bafd95b657680725192d00206ede91eeb057ee93e3028c37b528eae1af8cef97daa26183d71ce15750756329b9f1110a51072392a8492adee', 'author', '2025-06-30 22:34:40'),
(3, 'pengunjung', 'pengunjung@harmedic.com', 'scrypt:32768:8:1$99AI8swuUS73gTLv$1027e30d15248025ebc903e9de76408b44d430f2064f5ffe7f22dc97e2e9ba7d9d603fee14e156020601edc55d37d7e23e0a7e7a92bb2fa42416764ef67ec6dc', 'visitor', '2025-06-30 22:34:54'),
(4, 'hanni', 'hanni@harmedic.com', 'scrypt:32768:8:1$IISskLFW3B3m2fKP$3cc624d8be9048db82e04479832bb807d349aaf9fff5e726941d99325787f2d14e852bf9da804ca5bf575efdac2b1a5062d75516e95e9475d3598b2259f5d484', 'author', '2025-06-30 22:38:03'),
(5, 'pham', 'pham@harmedic.com', 'scrypt:32768:8:1$TlaZQz8glMWwadxk$ca3c82a301a508d389ce6421ab51a687ee984e9c4030e77cd61d5a56ce3c70c7a37c6e7ed4e1fdad17c9f9736a02ebe4b21dc87874e6aad4884f15304e328e3b', 'author', '2025-06-30 22:38:18'),
(6, 'arqalbi', 'arqalbi@harmedic.com', 'scrypt:32768:8:1$atiH6Pt8Z7edjJuz$3c63f906af8265c00e58166f05326359b908ee0b051266b404dfda8069d742998cf8448b84183ceaf68ce97cd60e9b0053127d93d0a987a4f03d88cc235c585e', 'author', '2025-07-02 08:11:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
