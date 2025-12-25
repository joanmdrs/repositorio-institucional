import { Menu } from "antd"
// const { SubMenu } = Menu;

function MenuAdmin () {

    return (
        <div>
            <Menu 
                mode="inline" 
                id="component-admin-menu"
                theme="dark"
            >   
                <Menu.Item key="/autor">
                    Autores
                </Menu.Item>
                
                <Menu.Item key="/orientador">
                    Orientadores
                </Menu.Item>

                <Menu.Item key="/departamento">
                    Departamentos
                </Menu.Item>

                <Menu.Item key="/curso">
                    Cursos
                </Menu.Item>

                <Menu.Item key="/palavra-chave">
                    Palavras-chave
                </Menu.Item>

                <Menu.Item key="/trabalho"> 
                    Trabalhos
                </Menu.Item>

                <Menu.Item key="/usuario">  
                    Usuários
                </Menu.Item>

                <Menu.Item key="/arquivo">
                    Arquivos
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default MenuAdmin