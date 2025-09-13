# Roadmap de Desenvolvimento - RockBandPay

---

## Fase 1: Finalizar a Configuração e a Base do Backend

O objetivo desta fase é ter um ambiente de desenvolvimento funcional e as operações básicas do banco de dados prontas.

1.  **Configurar o Banco de Dados:**
    *   Instalar o PostgreSQL (se ainda não estiver instalado).
    *   Criar um banco de dados para a aplicação.
    *   Atualizar o arquivo `.env` com a URL de conexão do seu banco de dados (`DATABASE_URL`).

2.  **Aplicar o Schema no Banco:**
    *   Executar o comando `npx prisma migrate dev --name init` no diretório `backend` para criar as tabelas no banco de dados com base no `schema.prisma`.

3.  **Implementar as Rotas da API (CRUD):**
    *   **Gerenciamento de Produtos:**
        *   `POST /products` (para criar um produto)
        *   `GET /products` (para listar todos os produtos)
        *   `PUT /products/:id` (para atualizar um produto)
    *   **Gerenciamento de Pulseiras (Wristbands):**
        *   `POST /wristbands` (para registrar uma nova pulseira)
        *   `GET /wristbands/:code` (para consultar uma pulseira pelo código)
    *   **Gerenciamento de Pedidos (Orders):**
        *   `POST /orders` (para criar um novo pedido associado a uma pulseira)
        *   `GET /orders/:wristbandId` (para ver o consumo de uma pulseira)
        *   `POST /orders/:orderId/items` (para adicionar itens a um pedido)

---

## Fase 2: Desenvolvimento do Frontend

O objetivo é criar a interface que será usada para gerenciar os pedidos.

1.  **Estruturar o Projeto Frontend:**
    *   O diretório `frontend` está vazio. Precisamos iniciar um projeto nele. Sugestão: **React com TypeScript**.
    *   Configurar a comunicação com a API do backend.

2.  **Desenvolver as Telas Principais:**
    *   **Tela de "Caixa" / Registro de Pedidos:**
        *   Interface para selecionar uma pulseira (seja digitando o código ou, no futuro, escaneando um QR code).
        *   Visualização do cardápio de produtos (puxados da API).
        *   Funcionalidade para adicionar itens ao pedido da pulseira selecionada.
    *   **Tela de Consulta e Pagamento:**
        *   Uma tela para buscar uma pulseira e ver todo o consumo detalhado.
        *   Botão para "Fechar a Conta", que irá interagir com a API de pagamento.

---

## Fase 3: Lógica de Negócio e Integrações

O foco aqui é refinar as regras de negócio e integrar com serviços externos.

1.  **Implementar a Lógica de Pagamento no Backend:**
    *   Criar a rota `POST /payments` que calcula o total de um pedido.
    *   Integrar com uma API de pagamentos (como a do PIX).

2.  **Refinar a Experiência do Usuário:**
    *   No frontend, criar a interface para exibir o QR code do PIX ou processar o pagamento com cartão.
    *   Implementar feedback visual para o status do pedido e do pagamento.
