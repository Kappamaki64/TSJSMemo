import Main, { // default exportのものだけ中括弧の外に書く
  MainClass,
  mainConstant as constant, // asをつけると変数名を変えることができる
  MainEnum,
  mainFunction,
  MainInterface as Interface, // asをつけると型名を変えることができる
  MainType
} from './main'

interface MainInterface {
  description: 'same name interface'
}

const a = new MainClass()
const b: Interface = {}
const c = MainEnum
const d: MainType = 'Main'
const e = mainFunction()
const f = constant

const defaultExportedSettings = Main.settings
