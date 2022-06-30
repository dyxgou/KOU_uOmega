import { randomInt } from "mathjs"
import { MAX_AMOUNTS , MIN_AMOUNTS } from "./amounts"

interface IRandomAmount
{
  min : number | undefined,
  max : number | undefined,
  job : "work" | "crime" | "fight"
}

const randomAmount = ({ min , max , job } : IRandomAmount) =>
{
  const amounts = {
    min : min || MIN_AMOUNTS[job],
    max : max || MAX_AMOUNTS[job]
  }

  let amount = randomInt(amounts.min , amounts.max)

  if (job === "work")
  {
    return amount
  }

  const jobSuccesfull = randomInt(0 , 100) % 2 === 0

  if (!jobSuccesfull)
    amount = -amount

  return amount
}

export default randomAmount
