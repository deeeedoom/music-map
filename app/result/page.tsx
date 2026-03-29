import ResultClient from "./ResultClient";

type ResultPageProps = {
  searchParams: Promise<{
    seed?: string;
    context?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;

  return <ResultClient seed={params.seed} context={params.context} />;
}