"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([
    { id: 1, user: "Rahim Ahmed", rating: 5, comment: "খুবই চমৎকার প্রোডাক্ট! কাপড়ের কোয়ালিটি অনেক ভালো।" },
  ]);
  const [newReview, setNewReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    const review = { id: Date.now(), user: "Customer", rating: 5, comment: newReview };
    setReviews([review, ...reviews]);
    setNewReview("");
  };

  return (
    <div className="mt-10 border-t pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-black flex items-center gap-2 text-sm transition-colors"
        >
          <Send size={16} /> Post
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {
          reviews.map((r) => (
            <div key={r.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{r.user}</span>
                <div className="flex text-amber-400">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}