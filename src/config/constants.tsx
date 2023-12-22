import { IoFolderOpenSharp } from "react-icons/io5";
import { paths } from "./paths";

type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
}

const sizeIcon = 22;

export const menu: SideNavItem[] = [
    {
        title: 'Product',
        path: paths.show.product.root,
        icon: <IoFolderOpenSharp size={sizeIcon} />,
    }/*,
    {
        title: 'Formación',
        path: paths.ryzp.formacion.root,
        icon: <IoSchoolOutline size={sizeIcon} />,
        submenu: true,
        subMenuItems: [
            {
                title: 'Colegiatura',
                path: paths.ryzp.formacion.colegiatura.root
            },
            {
                title: 'Pregrado',
                path: paths.ryzp.formacion.pregrado.root
            },
            {
                title: 'Postgrado',
                path: paths.ryzp.formacion.postgrado.root
            },
            {
                title: 'Adicional',
                path: paths.ryzp.formacion.adicional.root
            },
        ],
    },
    {
        title: 'Manejo de Habilidades',
        path: paths.ryzp.habilidad.root,
        icon: <IoFolder size={sizeIcon} />,
    },
    {
        title: 'Experiencia Laboral',
        path: paths.ryzp.experiencia.root,
        icon: <IoFolderOpenSharp size={sizeIcon} />,
    },
    {
        title: 'Manejo de Idiomas',
        path: paths.ryzp.idiomas.root,
        icon: <IoPeopleCircleSharp size={sizeIcon} />,
    },*/
];