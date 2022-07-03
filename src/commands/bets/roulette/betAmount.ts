import { randomInt } from "mathjs"

const betAmount = (amount : number) =>
{
  const isWinner = randomInt(1 , 100) % 2 === 0

  const finalAmount = isWinner ? amount * 2 : -amount

  return {
    amount : finalAmount,
    isWinner
  }
}

export default betAmount
