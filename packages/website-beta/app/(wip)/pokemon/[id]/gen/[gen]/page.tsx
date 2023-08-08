export default function Page({ params }: { params: { id: string; gen: string } }) {
  return (
    <>
      /pokemon/{params.id}/gen/{params.gen}
    </>
  )
}
