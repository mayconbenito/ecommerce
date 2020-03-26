import Header from "../components/Header";
import ProductSection from "../components/ProductSection";
import Content from "../components/Content";

const Home = () => (
  <div className="container">
    <Header />
    <Content>
      <ProductSection title="Lançamentos"></ProductSection>
      <ProductSection title="Mais Vendidos"></ProductSection>
      <ProductSection title="Melhor Avaliação"></ProductSection>
    </Content>
  </div>
);

export default Home;
