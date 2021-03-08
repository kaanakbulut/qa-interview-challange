describe('The Todos App', () => {
    beforeEach(() => {
        cy.visit('/examples/vue/')
    })

    const toDoItems = {
        item1: "buy some milk",
        item2: "enjoy the assignment",
        item3: "rest for a while",
        item4: "drink water"
    }

    //Given Empty ToDo list
    //When I write "buy some milk" to <text box> and press <enter>
    //Then I should see "buy some milk" item in ToDo list
    it('successfully added one item', () => {

        //When
        cy.get('.new-todo')
            .type(toDoItems.item1)
            .type('{enter}')

        //Then
        cy.get('ul.todo-list > li.todo').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain(toDoItems.item1)
        })
    })
    
    //Given ToDo list with "buy some milk" item
    //When I write "enjoy the assignment" to <text box> and press <enter>
    //Then I should see "enjoy the assignment" item inserted to ToDo list below "buy some milk" item
    it('successfully added two items', ()=>{

        //Given
        cy.get('.new-todo')
            .type(toDoItems.item1)
            .type('{enter}')

        //When
        cy.get('.new-todo')
            .type(toDoItems.item2)
            .type('{enter}')

        //Then
        cy.get('ul.todo-list > li.todo').should(($lis) => {
            expect($lis).to.have.length(2)
            expect($lis.eq(0)).to.contain(toDoItems.item1)
            expect($lis.eq(1)).to.contain(toDoItems.item2)
        })
    })

    //Given ToDo list with "buy some milk" item
    //When I click on <checkbox> next to "buy some milk" item
    //Then I should see "buy some milk" item marked as DONE
    it('successfully set item as done', () => {

        //Given
        cy.get('.new-todo')
            .type(toDoItems.item1)
            .type('{enter}')

        //When
        cy.get('.toggle')
            .click()

        //Then
        cy.get('ul.todo-list > li.todo').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain(toDoItems.item1)
            expect($lis.eq(0)).to.class('todo completed')
        })
    })

    //Given ToDo list with marked item
    //When I click on <checkbox> next to item
    //Then I should see "buy some milk" item marked as UNDONE
    it('successfully set item as undone', () => {

        //Given
        cy.get('.new-todo')
            .type(toDoItems.item1)
            .type('{enter}')
            .get('.toggle')
            .click()

        //When
        cy.get('.toggle')
          .click()

        //Then
        cy.get('ul.todo-list > li.todo').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain(toDoItems.item1)
            expect($lis.eq(0)).to.class('todo')
        })
    })

    //Given ToDo list with "rest for a while" item
    //When I click on <delete button> next to "rest for a while" item
    //Then List should be empty
    it('successfully deleted single item', () => {

        //Given
        cy.get('.new-todo')
            .type(toDoItems.item3)
            .type('{enter}')

        //When
        cy.get('.destroy')
            .invoke('show')
            .click()

        //Then
        cy.get('ul.todo-list > li.todo').should(($lis) => {
            expect($lis).to.have.length(0)
        })
    })


    //Given ToDo list with "rest for a while" and "drink water" item in order
    //When I click on <delete button> next to "rest for a while" item
    //Then I should see <drink water" item in ToDo list
    it('successfully deleted one item from a list', () => {

        //Given
        cy.get('.new-todo')
            .type(toDoItems.item3)
            .type('{enter}')
            .type(toDoItems.item4)
            .type('{enter}')

        //When
        cy.get('ul.todo-list > li.todo:nth-child(1) > div > button.destroy')
            .invoke('show')
            .click()

        //Then
        cy.get('ul.todo-list > li.todo').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain(toDoItems.item4)
        })
    })
})