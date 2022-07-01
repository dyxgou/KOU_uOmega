import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import { getMentionatedInfo , getUserInfo } from "../../../utils/userInfo"
import checkWinner, { optionsRow } from "./checkWinner"

const ALL_MONEY = "all"

const paperRocksScissors : ICallback = async (interaction) =>
{
  const challengingInfo = getUserInfo(interaction)
  const challengedInfo = getMentionatedInfo(interaction , "user")
  const amount = interaction.options.getString("amount" , true)

  if (challengingInfo?.userId === challengedInfo?.userId)
    return interaction.reply("No puedes retarte a ti mismo. 😫")

  if (interaction.options.getUser("user" , true).bot)
    return interaction.reply("No puedes retar a bots. 😫")

  const [userChallenging , userChallenged] = await Promise.all([
    UserSchema.findOne(challengingInfo , { cash : true , userId : true }),
    UserSchema.findOne(challengedInfo , { cash : true , userId : true })
  ])

  if (!userChallenging)
    return interaction.reply({ embeds : [userNotFound({ interaction })] })

  if (!userChallenged)
    return interaction.reply({ content : `<@!${challengedInfo?.userId}> no tiene una cuenta en éste servidor, para crear una puedes usar \`/start\`.` })

  const bet = amount === ALL_MONEY ? userChallenging.cash : parseInt(amount)

  if (bet <= 0)
    return interaction.reply({ content : "El monto debe ser mayor a 0." , ephemeral : true })

  if (userChallenging.cash < bet)
    return interaction.reply({ content : "No tienes el suficiente dinero en la billetera para apostar." , ephemeral : true })

  if (userChallenged.cash < bet)
    return interaction.reply({ content : "El usuario al que deseas apostar no tiene el suficiente dinero en la billetera." })

  const embed = messageEmbed({ interaction , name : "PIEDRA - PAPEL -TIJERA" })
    .setDescription(`<@!${userChallenging.userId}> **vs** <@!${userChallenged.userId}>
      
    <a:Bling:967855659477524560> ¡Bienvenidos a este reto! <a:Bling:967855659477524560>
    Se está disputando una apuesta de \`$${bet}\`, recuerda que solo tienes un tiempo límite de ** 2 minutos para elegir tu mano **.
    
    ** RECUERDEN ** : Aceptar la apuesta puede dejarlos en ceros o menos. 😟
    `)

  const hands = {}

  interaction.reply({ content : "Que inicie el reto... 😈" , ephemeral : true })
  const collector = await interaction.channel?.send({ embeds : [embed] , components : [optionsRow] }).then(msg => {
    return msg.createMessageComponentCollector({
      componentType : "BUTTON",
      filter : (int) => int.user.id === userChallenging.userId || int.user.id === userChallenged.userId,
      time : 1000 * 60 * 2 // 2 Minutes
    })
  })

  collector?.on("collect" , async (int) => checkWinner({
    int , embed , bet , userChallenged , userChallenging , hands
  }))
}

export default paperRocksScissors
