export default function SNSPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">SNS</h2>
      {/* Instagram 埋め込み例 */}
      <div>
        <h3 className="font-semibold">Instagram</h3>
        <iframe
          src="https://www.instagram.com/p/XXXXXXXX/embed"
          width="400"
          height="480"
          allowTransparency
          className="border rounded"
        />
      </div>
      {/* X(Twitter) 埋め込み例 */}
      <div>
        <h3 className="font-semibold mt-4">X (Twitter)</h3>
        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/keio_coffee_club/status/XXXXXXXX"></a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js"></script>
      </div>
    </div>
  );
}
