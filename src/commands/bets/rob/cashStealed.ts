import { randomInt } from "mathjs"

interface ICashStealed
{
  amount : number,
  isStealed : boolean
}

const cashStealed = (userToStealCash : number) : ICashStealed =>
{
  const isStealed = randomInt(1 , 100) % 2 === 0

  if (userToStealCash <= 1000)
    return {
      amount : 1000,
      isStealed : false
    }

  if (!isStealed)
    return {
      amount : -(userToStealCash / 4),
      isStealed : false
    }

  return {
    amount : userToStealCash / 2,
    isStealed : true
  }
}

export default cashStealed
