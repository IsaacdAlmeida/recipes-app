# Recipes App

## Introdução

O projeto consiste em desenvolver uma aplicação em react que simule um app mobile de receitas, nela a pessoa usuária pode fazer login, escolher diversas receitas de pratos e drinks, escolher por categoria, nacionalidade, favoritar a receita que mais gostar, ver os ingredientes da receita e visualizar o perfil, com as receitas favoritas e já feitas. 

## Sumário

- [Introdução](#introdução)
- [Tecnologias utilizadas](#tecnologias-utilizada)
- [Context API](#context-api)
- [Testes](#testes)
- [Metodologias Ágeis](#metodologias-ageis)
- [Aprendizados](#Aprendizados)
- [Instruções para utilizar a aplicação](#instruções-para-utilizar-a-aplicação)
- [Histórico de Commits](#histórico-de-commits)

## Tecnologias utilizada

**Front-End:** JavaScript, React, Context API e RTL.

## Context API

É uma funcionalidade do React que permite compartilhar o estado entre diversos componentes sem utilizar Props, evitando prop drilling. Optamos por usar essa tecnologia no lugar de Redux para entender melhor os conceitos desse assunto, uma vez que já tínhamos feito dois projetos com Redux e somente um com com context API.

## Testes

Fizemos diversos testes utilizando a react-testing-library, não conseguimos cobrir 100% de nossa aplicação, mas conseguimos cobrir boa parte do código com cobertura de testes.

## Metodologias Ágeis

Os métodos ágeis são uma alternativa à gestão tradicional de projetos. A utilização de metodologias ágeis nesse projeto foi crucial, foi um projeto com 87 requisitos e 5 pessoas trabalhando em grupo, utilizamos o quadro kanban para observar o andamento das tasks que foram distribuídas, definimos as metas e os combinados na primeira reunião e nas daily meetings acompanhamos o andamento do projeto de cada pessoa. Também fizemos pair programming em alguns requisitos.

## Aprendizados

Nosso grupo foi capaz de desenvolver uma aplicação em React que consome duas APIs com diversos endpoints, elas retornam uma lista de ingredientes de diversas pratos e drinks, sendo possível fazer filtro por nacionalidade, ingredientes, procurar receitas pelo nome, favoritar a receita, entrar na página de detalhes da receita e ver o passo a passo, bem como visualizar um vídeo de como preparar a receita.

Como dito anteriormente, utilizamos o context API do react em detrimento do Redux para gerenciar o estado, as duas opções nos atendiam perfeitamente, mas optamos pelon uso do context, pois, à época, o conhecimento nessa ferramenta ainda não estava consolidado. Aproveitamos esse projeto para fazer o uso dele, dessa forma conseguimos consolidar o conhecimento com o context.

Também aprendemos a trabalhar em equipe, eu diria que a maior dificuldade desse projeto não foi técnica, mas sim saber como organizar o trabalho em equipe, tivemos 10 dias de prazo para entrega do projeto e no quinto dia terminamos toda parte técnica da aplicação, restando 5 dias para aplicar a estilização, remover alguns bugs e otimizar a aplicação. Diria que trabalhar em equipe foi a parte mais divertida desse projeto, trabalhar com pessoas com pensamentos e soluções diferentes das quais imaginei foi muito proveitoso, pude aprender bastante com meus colegas de equipe.

## Instruções para utilizar a aplicação

Para utilizar a aplicação você precisará ter o [node](https://nodejs.org/en/download/) e [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalados.

Após instalar o node e npm, você precisará usar o comando `npm install` para instalar as dependências do repositório.

Você poderá utilizar o comando `npm start` para exibir a página da aplicação.

A aplicação foi desenvolvida para simular um aplicativo mobile, dessa forma você pode utilizar a extensão [Mobile Simulator](https://chrome.google.com/webstore/detail/mobile-simulator-responsi/ckejmhbmlajgoklhgbapkiccekfoccmk) para google chrome. 

## Histórico de commits

Você pode verificar todo o histório de commits para saber como a aplicação foi desenvolvida passo a passo, todos eles foram feitos com base no guia de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), mantendo uma organização e descrição objetiva do que foi feito a cada mudança!
***
  <a href="https://www.linkedin.com/in/isaacalmeidafilho/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
