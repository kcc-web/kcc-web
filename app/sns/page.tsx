'use client';

import { useEffect } from 'react';

export default function SNSPage() {
  useEffect(() => {
    // X（旧Twitter）の埋め込みスクリプトを読み込む
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('async', 'true');
    document.body.appendChild(script);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">SNS</h1>

        {/* Instagram Card */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Instagram</h2>
          <div className="flex justify-center">
            <iframe
              src="https://www.instagram.com/p/DIbbnC3pV7M/embed"
              width="400"
              height="480"
              allowTransparency
              allow="encrypted-media"
              className="border rounded"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            他の投稿は
            <a
              href="https://www.instagram.com/keiocoffeeclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-1"
            >
              @keiocoffeeclub をInstagramで見る
            </a>
          </p>
        </section>

        {/* X (Twitter) Card */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">X (Twitter)</h2>
          <div className="flex justify-center">
            <a
              className="twitter-timeline"
              data-height="600"
              href="https://twitter.com/TwitterDev"
            >
              Tweets by @TwitterDev
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}



