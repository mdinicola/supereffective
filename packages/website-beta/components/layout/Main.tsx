import classes from './Main.module.css'

type MainProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Main = ({ children, ...rest }: MainProps) => {
  return (
    <main className={classes.root} {...rest}>
      <div className={classes.wr}>{children}</div>
    </main>
  )
}

export default Main
