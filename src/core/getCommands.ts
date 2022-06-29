import * as fs from "node:fs"
import * as path from "node:path"

const getCommands = (directory : string , suffix : string) =>
{
  let commands : string[] = []
  const fileDirs : fs.Dirent[] = fs.readdirSync(directory , { withFileTypes : true })

  for (const file of fileDirs)
  {
    if (file.name.endsWith(".d.ts"))
    {
      continue
    }

    if (file.isDirectory())
    {
      commands = [
        ...commands,
        ...getCommands(path.join(directory , file.name) , suffix)
      ]
    }
    else if (file.name.endsWith(`index${suffix}`))
    {
      commands.push(path.join(directory , file.name))
    }
  }

  return commands
}

export default getCommands
