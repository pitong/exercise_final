describe('My First Test', () => {
  it('Filter search test', () => {
    const searchValue = 'First';

    cy
        .visit('http://localhost:3000')
        .get('[data-test-id="menu-link-search"]').should('be.visible')
        .type(searchValue)
        .get('[data-test-id="menu-link-item__title"').then(($list) => {
             const filteredList = [...$list].filter(title$ => title$.innerHTML.includes(searchValue));
             expect(filteredList.length).to.equal(3);
    })
  })
})
