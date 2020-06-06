import Knex from 'knex';
export async function seed(knex:Knex){
    await knex('items').insert([
        {title: 'Lampadas', image: 'lampadas.svg'},
        {title: 'Pilhas e Baterias', image: 'lampadas.svg'},
        {title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
        {title: 'Resíduos e Eletronicos', image: 'eletronicos.svg'},
        {title: 'Resíduos Orgânicos', image: 'organicos.svg'},
        {title: 'Óleos', image: 'oleo.svg'},
    ])
}