import {
  FaImdb,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-300 py-10 px-4 mt-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <FaImdb className="text-yellow-400 text-4xl" />
            <h1 className="text-xl font-bold text-white">IMDb Clone</h1>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xl">
            <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
            <FaYoutube className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>

        {/* Middle Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <span className="hover:text-yellow-400 cursor-pointer">Help</span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Site Index
          </span>
          <span className="hover:text-yellow-400 cursor-pointer">IMDbPro</span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Box Office Mojo
          </span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Advertising
          </span>
          <span className="hover:text-yellow-400 cursor-pointer">Jobs</span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Conditions of Use
          </span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Privacy Policy
          </span>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-xs text-gray-500">
          &copy; 2025 IMDb Clone |{" "}
          <span className="text-gray-400">An Amazon-Inspired Project</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
