import { CartProvider } from './context/CartContext';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Featured } from './components/Featured/Featured';
import { MenuSection } from './components/Menu/MenuSection';
import { Gallery } from './components/Gallery/Gallery';
import { Feedback } from './components/Feedback/Feedback';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { CheckoutModal } from './components/Cart/CheckoutModal';
import { OrderToast } from './components/Cart/OrderToast';
import { FloatingCartButton } from './components/Cart/FloatingCartButton';

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Featured />
        <MenuSection />
        <Gallery />
        <Feedback />
      </main>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
      <CheckoutModal />
      <OrderToast />
    </CartProvider>
  );
}

export default App;
