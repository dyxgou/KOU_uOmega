import { randomInt } from "mathjs"

interface ICashStealed
{
  amount : number,
  isStealed : boolean
}

const cashStealed = (userToStealCash : number) : ICashStealed =>
{
  const isStealed = randomInt(1 , 100) % 2 === 0

  if (!isStealed)
    return {
      amount : -(userToStealCash / 4),
      isStealed
    }

  if (userToStealCash <= 1000)
    return {
      amount : -1000,
      isStealed
    }

  return {
    amount : userToStealCash / 2,
    isStealed
  }
}

export default cashStealed
