import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import api from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  pages: number;
  genre: string;
  status: string;
}

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await api.get<Book>(`/api/books/${id}`);
        setBook(response.data);
        setError(null);
      } catch (err) {
        setError('Buku tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={20} />
        <span>Kembali</span>
      </button>

      {loading && <p className="text-gray-500">Memuat...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {book && (
        <div className="space-y-4">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full rounded-xl object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-600">{book.author}</p>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="text-gray-800 font-medium">{book.rating}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-xl">
              <div className="font-bold text-blue-600">{book.pages}</div>
              <div className="text-xs text-gray-600">Halaman</div>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <div className="font-bold text-green-600">{book.genre}</div>
              <div className="text-xs text-gray-600">Genre</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <div className="font-bold text-purple-600">{book.status}</div>
              <div className="text-xs text-gray-600">Status</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;