/* -------------------------------------------------- *-
 |  コメント
-* -------------------------------------------------- */

// 一行のコメント
/* 範囲のコメント */
/**
 * JSDoc
 */

/* -------------------------------------------------- *-
 |  はじめに
-* -------------------------------------------------- */
// TypeScriptはJavaScriptに型をつけた言語です
// JavaScriptに変換してから実行するので、TypeScriptはJavaScriptでできないことはできません

// あくまで個人的な使い方メモなので、正確な情報や詳細な情報はドキュメントを見てください
// JavaScript -> [JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript)
// TypeScript -> [TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/)

// 実行方法
// JavaScriptの場合
//   node fileName.js で実行することができます
//   動作確認など簡単なものは、ブラウザのコンソールを開いて実行することができます
// TypeScriptの場合
//   グローバルにどこでも使えるコマンドとしてts-nodeをインストール
//   npm install -g ts-node
//   npx ts-node fileName.ts で実行することができます
//   （このmain.tsはJSの説明上コンパイルエラーが起きるようになっているので、別ファイルを作って実行することをおすすめします）

// 出力
console.log('console.logはstringに限らずなんでも出力できます')
// ブラウザのコンソールで出力すると、値の中身をわかりやすく表現してくれます

/* -------------------------------------------------- *-
 |  変数宣言 const, let, var
-* -------------------------------------------------- */
{
  const constant = 1 // 値が不変の変数
  // constant = 2; // NG 再代入不可
  // const noInitialize; // NG 宣言時に初期化する必要がある

  let variable = 1 // 値が可変の変数
  variable = 2 // OK
  let noInitialize // OK 参照するとundefinedという値が返る

  var dangerousVariable // スコープや仕様が難しいので絶対に避ける
}
/* -------------------------------------------------- *-
 |  JavaScriptの値の種類 string, number, bigint, boolean, symbol, undefined, object, function
-* -------------------------------------------------- */
{
  // 代入したときに値渡しのもの
  const string = `console: ${console}` // 文字列の中に変数を入れたい場合は``で囲んで${}
  const number1 = 1.1111 // 整数も小数も全てnumber
  const number2 = NaN // 非数もnumber
  const bigint = BigInt(1) // 使ったことない
  const boolean = true // true or false
  const symbol = Symbol('symbol') // 使ったことない
  const undefinedVariable = undefined // undefined という値がある

  // 以下代入したときに参照渡しのもの

  // 関数も変数のように扱うことができる
  let functionVariable = (arg) => {
    return arg
  } // ラムダ式 (arg1, arg2, ...) => 式 や ブロック{}
  functionVariable(1) // -> 1
  functionVariable = (arg) => arg * 2
  functionVariable(1) // -> 2
  // functionによる定義もできる
  function func(arg) {
    return arg * 3
  }

  // 上記以外は、全て object という扱い
  // objectは全て key: value の組みで表現できる
  const object = {
    num: 1, // コンマ区切り
    str: '',
    subObject: {}, // objectの中のobject
    func1: () => {}, // ラムダ式
    func2() {}, // interfaceとかで使う書き方、厳密にはラムダ式の場合と振る舞いが異なることがある
    func3: function () {}, // functionによる書き方 慣れるとラムダ式の方がわかりやすい
    0: 'element0',
    1: 'element1',
    2: 'element2'
  }
  // 配列もobject
  const array1 = [1, 2, '', undefined, {}, []] // []; で初期化 JavaScriptは型がないのでなんでもいれられる
  const array2 = new Array(3) // 基本[]による初期化をするので使わない 要素数3の空の配列
  // nullもobject
  const nullObject = null // undefinedとは異なる

  // アクセス方法
  object.num = 2
  object.func1()
  const id = 1
  object[id] = 'element1' // object[number] または object["keyName"] でもアクセスできる
  object[3] = 'element3' // key: value の追加 存在しないkeyを指定して代入する
  delete object[3] // key: value の削除 delete object[keyName]

  // typeofによって、変数の値の種類の名前がstringで得られる
  typeof undefinedVariable // -> "undefined"
  typeof nullObject // -> "object"
}
/* -------------------------------------------------- *-
 |  プリミティブ型 string, number, bigint, boolean, symbol, null, undefined
-* -------------------------------------------------- */
{
  // JavaScriptで扱う値にTypeScriptでつけた型
  // 変数宣言の後に : 型名 を書く
  const string: string = 'a'
  const number: number = 1
  const bigint: bigint = BigInt(1)
  const boolean: boolean = true
  const symbol: symbol = Symbol('s')
  const nullObject: null = null
  const undefinedVariable: undefined = undefined

  // ただし、正しく型推論してくれる場合は無理に型を書かなくていい
}
/* -------------------------------------------------- *-
 |  リテラル型 "a", 1, true
-* -------------------------------------------------- */
{
  // 簡単な数字や文字列、真偽値がそのまま型になる
  let one: 1 = 1
  // one = 2; // NG
  one = 1
  const trueVariable: true = true
  const a: 'a' = 'a'
}
/* -------------------------------------------------- *-
 |  オブジェクト型 { a: string, b?: number }, { [id: string]: boolean }
-* -------------------------------------------------- */
{
  // = の前が型を表している
  const object1: {
    a: string
    b?: number // ?はkeyがなくても良いことを表す b: number | undefinedと同じ（後述）
  } = {
    a: 'valueA'
  }

  // keyを明示しないこともできる
  const flags: { [id: string]: boolean } = {}
  flags['id_aaa'] = false
  flags['id_bbb'] = true

  // interfaceによるオブジェクトの型宣言
  // JavaScriptにはinterfaceは存在しない、TypeScriptの機能
  // オブジェクト指向のinterfaceというよりも、ただの構造体としてよく使う
  interface InterfaceA {
    a: string
    b?: number
  }
  // 長いオブジェクトの型やよく使う型はinterfaceで抜き出した方がコードが読みやすい
  const object2: InterfaceA = { a: 'valueA' }
}
/* -------------------------------------------------- *-
 |  配列型 number[]
-* -------------------------------------------------- */
{
  const array1: number[] = [1, 2, 3] // よく使う書き方
  const array2: Array<number> = [1, 2, 3] // 使わない書き方
  // 多次元配列
  const matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6]
  ]
}
/* -------------------------------------------------- *-
 |  関数型 (arg: string) => number
-* -------------------------------------------------- */
{
  // 関数名(arg1: 引数の型名, arg2: 引数の型名): 返り値の型名
  function getLength(string: string): number {
    return string.length
  }

  // (引数名 型名, ...) => 返り値の型
  const getLength1: (s: string) => number = (string: string): number => {
    return string.length
  }
  const getLength2: (s: string) => number /* ここまでが型の記述 */ = /* ここからが値の記述 */ (string: string): number => { 
    return string.length
  }

  // 型パラメータ <TypeName1, TypeName2, ...>
  const identity1: <T>(a: T) => T = <U>(arg: U): U => {
    return arg
  }
  // 推論できる部分は書かなくてもいい
  const identity2: <T>(a: T) => T = arg => arg // 値の引数や返り値の型を省略
}
/* -------------------------------------------------- *-
 |  タプル型 [string, number]
-* -------------------------------------------------- */
// TypeScriptの機能
// JavaScriptにはないので、JavaScriptに変換すると配列になる
{
  // [型, 型, ...]
  const tuple: [string, number, boolean] = ['aaa', 1, false]
  const element0 = tuple[0] // string型
  const element1 = tuple[1] // number型
  const element2 = tuple[2] // boolean型
  const n: number = 10
  const elementN = tuple[n] // string | number | boolean型（後述）
  // 最後の要素の型のみ、...型名[] として無限長にできる
  const infinite: [string, ...number[]] = ['aaa', 1, 2, 3, 4, 5, 6]
}
/* -------------------------------------------------- *-
 |  never型 never
-* -------------------------------------------------- */
{
  // ありえない場合はnever型
  function f(str?: string): number {
    switch (typeof str) {
      case 'undefined':
        return 0 // strはundefined型
      case 'string':
        return str.length // strはstring型
      default: {
        const po = str // strはnever型
        return -1
      }
    }
  }

  const g = () => {
    throw new Error()
  }
  const po = g() // gの返り値はnever型
}
/* -------------------------------------------------- *-
 |  なんでも型 any, unknown
-* -------------------------------------------------- */
{
  // any型 TypeScriptの型の支援が何もきかなくなる
  // バグの元なので絶対に使わないように
  let anythingIsOK: any
  anythingIsOK = 1
  anythingIsOK = 'aaa'
  anythingIsOK = { anythingIsOK }

  // unknown型 TypeScriptがサポートするなんでも型（最も弱い型）
  // 使っても大丈夫（参照時に工夫が必要）
  let unknownValue: unknown
  unknownValue = 1
  unknownValue = 'aaa'
  unknownValue = { unknownValue }

  const anySum = anythingIsOK + 1 // エラーが出ない
  // const unknownSum = unknownValue + 1; // エラーが出る
  if (typeof unknownValue === 'number') {
    // 型チェックがあれば使えるようになる
    const unknownSum = unknownValue + 1
  }
}
/* -------------------------------------------------- *-
 |  キャスト as
-* -------------------------------------------------- */
{
  // キャストして型を変えることができる
  const number = 1
  const string: string = number as unknown as string // 抜け道
  // ライブラリの返り値の型がおかしいときなど、どうしようもないときに使う
}
/* -------------------------------------------------- *-
 |  型定義 type, interface
-* -------------------------------------------------- */
{
  // TypeScriptで型を自分で作る方法
  // JavaScriptは型がないので、JavaScriptの変換すると型定義のコードはなくなる

  // type 型名 = 型 で自分で型を定義できる
  type Pair<T, U> = [T, U]
  type Triple<T, U, V> = [T, U, V]
  const pair: Pair<number, number> = [1, 1]

  // interfaceはtypeの特殊なものとも言えるかも
  type PositionA = { x: number; y: number; z: number }
  interface PositionB {
    x: number
    y: number
    z: number
  }
  const position1: PositionA = { x: 1, y: 2, z: 3 }
  const position2: PositionB = position1 // PositionAとPositionBは中身が同じなので代入できる
}
/* -------------------------------------------------- *-
 |  その他 型の演算子みたいなもの A | B, A & B, T extends C ? X : Y, is, typeof, keyof, A["B"], in
-* -------------------------------------------------- */
{
  interface A {
    type: 'a'
    a: number
  }
  interface B {
    type: 'b'
    b: number
  }
  const a: A = { type: 'a', a: 7 }
  const b: B = { type: 'b', b: 13 }

  // T | U でどちらかのような型ができる TかUか
  type AOrB = A | B
  // セミコロンは前の行と()が組み合わさってB()のように解釈されないようにするため
  ;((arg: AOrB) => {
    // typeは "a" | "b" 型
    const type = arg.type
    // A または B なので、まだ共通するtypeしか取得できない
    // const a = arg.a
    // const b = arg.b
    if (type === 'a') {
      // argは A 型（TypeGuard タイプガード）
      const a = arg.a // aが取得できるようになった
      return
    }
    // returnしたので、argは B 型
    const b = arg.b // bが取得できるようになった
  })(a) // ラムダ関数を引数aで呼び出す bでも可

  // T & U で拡張するような型ができる TでありUであるもの
  type AAndX = A & { x: number }
  ;((arg: AAndX) => {
    // 全部持っている
    const type = arg.type
    const a = arg.a
    const x = arg.x
  })({ type: 'a', a: 0, x: -1 })
  type Never = A & B // keyが"type"のときの型が衝突しているのでneverになる

  // 型の条件分岐
  type Element<T> = T extends Array<infer U> ? U : undefined
  // Tが配列ならば、その要素の型をUとして、Uを返す
  // そうでないならば、undefinedを返す
  type X = Element<number[]> // Xはnumber
  type Y = Element<string> // Yはundefined

  // TypeGuard タイプガード
  // 引数名 is 型名 によって、返り値がtrueのときに引数がその型であることが表現できる
  function isArray(object: object): object is unknown[] {
    // 実際の返り値は true or false
    return Array.isArray(object)
  }
  const o: object = {}
  if (isArray(o)) {
    const length = o.length // この中ではoは配列
  }

  // 型記述で typeof 値 を書くと、値の型が得られる
  const user1 = { id: 0, name: 'user' }
  type User = typeof user1

  // keyofでobject型のkeyの|が得られる
  type KeysOfA = keyof A // "type" | "a"

  // object型の要素の型を ObjectName["keyName"] で得られる
  type ValueOfX = { x: number }['x'] // number
  type ValuesOfA = A[KeysOfA] // "a" | number
  type E<T extends unknown[]> = T[0] // 配列に対しては数字を入れると要素の型が得られる
  type Z = E<string[]> // string

  type ABC = 'A' | 'B' | 'C'
  // T in Type によってTypeの中にある型の1つがTという意味にできる
  const abcToNumber: { [T in ABC]: number } = {
    A: 1,
    B: 2,
    C: 3
    // ,D: 4 // エラー
  }
}
/* -------------------------------------------------- *-
 |  関数 デフォルト引数や可変長引数など
-* -------------------------------------------------- */
{
  function exampleFunction<T>(
    arg1: T,
    // 以降、引数全体の最後に書けるもの
    arg2 = 'defaultString', // デフォルト引数 引数が指定されない場合は "defaultString" で初期化される
    arg3?: boolean, // boolean | undefined 引数が指定されない場合は undefined になる
    ...others: T[] // 可変長引数
  ): T {
    // 関数の定義でJavaのthrowsのようなものは存在しない
    return arg1
  }
  // 自動的に推論できる場合は型引数を書かなくてもいい
  exampleFunction(1) // OK
}
/* -------------------------------------------------- *-
 |  演算子（JSの話） 割り算 比較演算子 スプレッド演算子... オプショナルチェーン?.
-* -------------------------------------------------- */
{
  // numberしかないので、整数同士の割り算は小数になる
  const divided1 = 5 / 2 // -> 2.5
  const divided2 = Math.floor(5 / 2) // -> 2

  // Truthy: 条件式においてtrueとみなせるもの
  // Falsyなもの以外
  if (
    !(
      (
        {} || // 空オブジェクトはtruthy
        [] || // 空配列はtruthy
        'false' // 空でない文字列なのでtruthy
      )
    )
  ) {
    throw new Error()
  }
  // Falsy: 条件式においてfalseとみなせるもの
  // 以下のもの
  if (false || 0 || '' || null || undefined || NaN) {
    throw new Error()
  }

  // ==と===、!=と!==の違い
  // ==, != : 型が異なる場合は型を変換して比較、バグの元なので使わない方がいい
  // 以下はtrue
  //   1 == "1"
  //   null == undefined
  //   0 == false

  // ===, !== : 同じ型かも含めて厳密に比較
  // 以下はfalse
  //   1 === "1"
  //   null === undefined
  //   0 === false

  // オブジェクトのみ参照を見て比較する
  const array1: number[] = []
  if (
    !(
      (
        array1 === array1 && // -> true
        array1 !== [] // array1 === [] -> false
      )
    )
  )
    throw new Error()

  // スプレッド演算子...によるシャローコピー
  // array1の key: value の組みをばらばらにして、囲んであげるイメージ
  const array2: number[] = [...array1] // 配列になる
  const arrayObject = { ...array1 } // オブジェクトとして扱われる
  if (array1 === array2) throw new Error()
  // こんな使い方もできる
  const oneToNine = [...[1, 2, 3], ...[4, 5, 6], 7, 8, 9]
  const data = { date: new Date(), place: 'Tokyo' }
  const extendedData = {
    ...data,
    name: 'Bob',
    age: 20,
    place: 'London' // 後から書くと上書きできる
  }

  // ?.によるアクセス
  // undefined または null のときは、それ以降は評価せずにundefinedを返す
  interface A {
    a?: A
    result: number
  }
  const a: A = { a: { result: 2 }, result: 1 }
  // const result1 = a.a.a.a.a.a.result // 実行時にundefined.aの参照エラーになる
  const result2 = a?.a?.a?.a?.a?.a?.result // undefinedが返る
}
/* -------------------------------------------------- *-
 |  分割代入など
-* -------------------------------------------------- */
{
  function registerHandler(
    handler: (arg: { userID: string; count: number }) => void
  ): { success: boolean; id: string } {
    const success = true
    const id = 'aaaa'
    return { success, id } // keyと変数名が同じ場合は省略できる
    // return { success: success, id: id }
  }
  // successのみを取り出して、変数sに代入
  const { success: s } = registerHandler(({ userID }) => {
    // 引数のuserIDのみを取り出した
    console.log(userID)
  })
  console.log(s)

  // 使わない場合
  const data = registerHandler((arg) => {
    console.log(arg.userID)
  })
  console.log(data.success)
}
/* -------------------------------------------------- *-
 |  定義済みのデータ構造の型 配列Array, マップMap, 集合Set, Readonly{Array,Map,Set}
-* -------------------------------------------------- */
{
  // Array<T>型 可変長で便利な関数も入っている
  const array = [1, 2, 3]
  const length = array.length
  // 代表的なmutableなメソッド 配列を書き換える
  array.push(4) // [1, 2, 3, 4]
  array.unshift(0) // [0, 1, 2, 3, 4]
  array.pop() // -> 4; [0, 1, 2, 3]
  array.shift() // -> 0; [1, 2, 3]
  array.sort().reverse() // [3, 2, 1]
  // 代表的なimmutableなメソッド 元の配列はそのまま
  array
    .concat([0, -1])
    .map((num) => num * 2)
    .filter((num) => num <= 5)
    .forEach((num) => console.log(num))
  const and = array.every((num) => num > 0) // 各要素についての &&
  const or = array.some((num) => num > 0) // 各要素についての &&
  const include = array.includes(0)

  // Map<Key, Value>型 値の対応
  const map = new Map<string, number>()
  const size1 = map.size
  map.set('a', 1).set('b', 2).set('c', 3)
  const one = map.get('a')
  map.delete('a')
  map.forEach((value, key) => console.log(`${key}: ${value}`))
  map.clear()
  const keys = [...map.keys()] // keyの配列
  const values1 = [...map.values()] // valueの配列
  const entries = [...map.entries()] // entry（型は[Key, Value]のタプル）の配列

  // Set<T>型 集合
  const set = new Set<number>()
  const size2 = set.size
  set.add(1).add(2).add(3)
  const has = set.has(1)
  set.delete(1)
  set.forEach((value) => console.log(value))
  set.clear()
  const values2 = [...set.values()] // valueの配列

  // immutableにしたい場合（publicに公開したいときなど）
  const readonlyArray: ReadonlyArray<number> = array
  const readonlyMap: ReadonlyMap<string, number> = map
  const readonlySet: ReadonlySet<number> = set
  readonlyMap.get('c') // OK
  // readonlyMap.set("a", 1) // エラー

  // 拡張for文 for-of
  for (const element of readonlyArray) console.log(element)
  for (const entry of readonlyMap) {
    const [key, value] = entry
    console.log(`${key}: ${value}`)
  }
  for (const element of readonlySet) console.log(element)
}
/* -------------------------------------------------- *-
 |  objectの操作方法
-* -------------------------------------------------- */
{
  const counts: { [name: string]: number } = {}
  counts.apple = 5
  counts.banana = 2
  counts.chocolate = 9

  // Object.keys(object), Object.values(object) でkeyやvalueの配列が得られる
  const keys = Object.keys(counts) // ["apple", "banana", "chocolate"]
  const values = Object.values(counts) // [5, 2, 9]
  const entries = Object.entries(counts) // [["apple", 5], ["banana", 2], ["chocolate", 9]]

  // 拡張for文 for-in
  for (const key in counts) {
    // for-in ではobjectのkeyがstringで得られる
    keys.includes(key)
  }
}
/* -------------------------------------------------- *-
 |  class
-* -------------------------------------------------- */
// interfaceやclassには可視性やreadonlyはつけない
// メンバ変数やメソッドの可視性は public, protected, private のみ（packageの概念は存在しない）
// 何もつけないと public になる
interface Interface {
  num: number
  readonly readonlyStr: string
  func(): void
}
// 複数のインターフェースの実装は可
abstract class AbstractClass implements Interface {
  public abstract num: number
  public readonly readonlyStr: string
  // コンストラクタ
  protected constructor(readonlyStr: string) {
    // コンストラクタ内でreadonlyな変数を初期化してもよい
    this.readonlyStr = readonlyStr
  }

  public func(): void {
    console.log('super method')
  }

  protected abstract protectedFunc(): number
}
// 継承できるクラスは1つまで
class ConcreteClass extends AbstractClass {
  private _num = 0
  private constructor(readonlyStr: string) {
    super(readonlyStr)
  }

  // getter専用の書き方
  public get num(): number {
    console.log('get num')
    return this._num // thisは省略不可
  }

  // setter専用の書き方
  public set num(newValue: number) {
    this._num = newValue
    console.log('set num')
  }

  public func(a?: number): void {
    super.func()
  }

  protected protectedFunc(): number {
    this.num = 1 // setterが呼ばれる
    return this.num // getterが呼ばれる
  }

  // singleton
  private static readonly class: ConcreteClass = new ConcreteClass('single')
  public static getConcreteClass(): ConcreteClass {
    return this.class
  }
}
const instance = ConcreteClass.getConcreteClass()
// instanceof は指定したクラスのコンストラクタから生成されたかどうかを返します
if (!(instance instanceof ConcreteClass)) throw new Error()
/* -------------------------------------------------- *-
 |  enum
-* -------------------------------------------------- */
// 列挙型もあるけど、型でいろいろしたい場合に扱いづらい
enum MyEnum {
  A = 1,
  B = 'b',
  C = 10
}
const one = MyEnum.A // 入っている実際の値は1
const enumIdentity = (e: MyEnum) => e
enumIdentity(MyEnum.A)

// TypeScriptならenumを使うよりも文字列の|で表してもいい
type EventType = 'onMouseClicked' | 'onWindowLoaded' | 'onWindowClosed'
const eventHandlerMap = new Map<EventType, () => void>()
// EventTypeの補完が効く
eventHandlerMap.set('onMouseClicked', () => console.log('mouse click!'))
/* -------------------------------------------------- *-
 |  importとexport
-* -------------------------------------------------- */
// 他のファイルから参照したい場合はexportを書いておく
export interface MainInterface {}
export class MainClass {}
export enum MainEnum {}
export type MainType = 'Main'
export function mainFunction(): void {}
export const mainConstant = 'Main'
// ファイルごとに1回だけdefault exportができる importの仕方が変わる
export default class Main {}
// import方法はimporter.tsを参照
/* -------------------------------------------------- *-
 |  エラー throw new Error()
-* -------------------------------------------------- */
{
  try {
    // Error JavaScriptでもともと用意してあるもの
    if (0) throw new Error('description')
    if ('') throw 1000
  } catch (e: unknown) {
    console.error(e)
  }
  // 関数宣言でJavaのthrowsのようなものは存在しない
}
/* -------------------------------------------------- *-
 |  非同期実行 Promise, async, await
-* -------------------------------------------------- */
{
  // 非同期実行のためのクラス Promise
  function createPromise(): Promise<number> {
    return new Promise<string>((resolve, reject) => {
      if (0) {
        // エラーがあったとき
        reject('Something is wrong!!!')
      }
      setTimeout(() => {
        // 1秒後、resolveに"DONE"を入れて終了
        resolve('DONE!')
      }, 1000)
    })
      .then((message) => {
        // resolveが呼ばれたとき
        console.log(`resolved: ${message}`)
        return 0
      })
      .catch((errorMessage) => {
        // rejectが呼ばれたとき
        console.log(`rejected: ${errorMessage}`)
        return 1
      })
      .finally(() => {
        // 共通して実行される
        console.log(`finalize promise`)
      })
  }

  // ネストが深くならないように async - awaitが用意されている
  // awaitが使えるのはasyncの領域内やグローバルの部分だけ
  // asyncを関数につけた場合は返り値はPromiseでないといけない
  async function asyncFunction(): Promise<number> {
    const result = await createPromise() // promiseがresolveまたはrejectされるまで待機
    console.log(result)
    return result
  }
}
/* -------------------------------------------------- *-
 |  型応用 Readonly<>, Partial<>, Required<>, ...
-* -------------------------------------------------- */
{
  interface ABCDE {
    a: number
    b: number
    c: number
    d: {
      e: string
    }
  }

  // Readonly<T> 直下のプロパティー全てにreadonlyをつける
  type ReadonlyABCDE = Readonly<ABCDE>
  const abcde1: ReadonlyABCDE = {
    a: 1,
    b: 2,
    c: 3,
    d: { e: 'this is not readonly' }
  }
  // abcde.a = 10 // エラー
  // abcde.d = { e: "" } // エラー
  abcde1.d.e = '' // エラーにならない

  // 再帰的にやりたい場合
  type RecursiveReadonly<T> = {
    readonly [P in keyof T]: RecursiveReadonly<T[P]>
  }
  type RecursiveReadonlyABCDE = RecursiveReadonly<ABCDE>
  const abcde2: RecursiveReadonlyABCDE = abcde1
  // abcde2.d.e = "" // エラー

  // Partial<T> 直下のプロパティー全てに?をつける
  type PartialABCDE = Partial<ABCDE>
  const empty1: PartialABCDE = {} // OK

  // Required<T> 直下のプロパティー全ての?をはずす
  type RequiredPartialABCDE = Required<Partial<ABCDE>>
  // const empty2: RequiredPartialABCDE = {} // エラー

  // PartialやRequireなどの定義に移動すると、近辺に似たような便利な型が定義されている
}
