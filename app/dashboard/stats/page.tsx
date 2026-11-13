import SeoHead from '@/components/SeoHead';
import StatsChart from '@/components/StatsChart';

export default function StatsPage() {
  return (
    <>
      <SeoHead title="Estadísticas" description="Métricas de visitas e interacciones de tu perfil" />
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">Estadísticas</h1>
        <StatsChart />
      </section>
    </>
  );
}
