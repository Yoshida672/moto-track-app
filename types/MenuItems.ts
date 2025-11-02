// MenuItems.ts
export interface MenuItem {
  label: string;
  href: string;
  onlyLoggedIn?: boolean; 
  onlyLoggedOut?: boolean;
}

export const menuItems: MenuItem[] = [
  { label: "Início", href: "/" },
  { label: "Lista", href: "/listaMotos", onlyLoggedIn: true },
  { label: "Cadastro", href: "/cadastroMoto", onlyLoggedIn: true },
  { label: "Sobre", href: "/sobre" },
  { label: "Login", href: "/login", onlyLoggedOut: true },
];
