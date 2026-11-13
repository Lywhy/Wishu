export const interfacePalettes = [
  {
    id: "coffee",
    title: "Кофейная",
    swatch: "bg-[#795038]",
    light: ["#e6cfb6", "#cfa77e", "#a57853", "#795038"],
    dark: ["#352419", "#65432e", "#a47750", "#d7ad85"],
  },
  {
    id: "supabase",
    title: "Supabase",
    swatch: "bg-[#1b8056]",
    light: ["#d6f5e6", "#a1e4c7", "#44b886", "#1b8056"],
    dark: ["#12382b", "#1d6548", "#36a776", "#60d9a2"],
  },
  {
    id: "react-bits",
    title: "React Bits",
    swatch: "bg-[#7847cf]",
    light: ["#eee0ff", "#cbb0f4", "#a277de", "#7847cf"],
    dark: ["#251039", "#4c2475", "#9454cf", "#c6a0ff"],
  },
  {
    id: "shadcn",
    title: "shadcn",
    swatch: "bg-[#27272a]",
    light: ["#e4e4e7", "#b1b1b9", "#71717a", "#27272a"],
    dark: ["#18181b", "#3f3f46", "#a1a1aa", "#fafafa"],
  },
] as const

export type InterfacePalette = (typeof interfacePalettes)[number]["id"]
export function isInterfacePalette(value: string): value is InterfacePalette {
  return interfacePalettes.some((palette) => palette.id === value)
}
