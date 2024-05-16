import { saveOrderToDatabase } from '../../app/api/api.js';

export default function PaymentPage({ bookingData, onBack, onNext }) {
    const handlePayment = async () => {
        try {
            // Simulerer et fiktivt køb ved at gemme dataene i databasen
            await saveOrderToDatabase(bookingData);
            console.log('Order saved to database:', bookingData);

            // Proceed to confirmation page
            onNext();
        } catch (error) {
            console.error('Failed to process payment:', error);
        }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl mb-6">Betalingsside</h1>
        <p className="mb-6">Her vil betalingsdetaljer blive indtastet.</p>
        <div>
          <button
            onClick={onBack}
            className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    );
}
