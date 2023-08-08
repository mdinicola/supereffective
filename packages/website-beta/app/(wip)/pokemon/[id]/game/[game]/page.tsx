export default function Page({ params }: { params: { id: string; game: string } }) {
  return (
    <>
      /pokemon/{params.id}/game/{params.game}
    </>
  )
}
