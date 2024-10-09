export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Bargain Bliss. All rights reserved.</p>
            <div>
              <a href="/privacy" className="text-gray-400 hover:text-white px-3">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white px-3">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  