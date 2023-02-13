const user = require('../fixtures/userJson.json');

describe ("json test user", () => {
   

    it("create user", () => {
        cy.createUser(user.login).then(({body}) => {
            expect(body.code).to.eq(200);
            expect(body.message).to.eq('ok')
        })
    })

    it("change user", () => {
        cy.createUser(user.login);
        cy.request({
            method: 'Put',
            url: `https://petstore.swagger.io/v2/user/${user.login}`,
            body: 
                {
                    "id": user.id
                }
        
        }).then(({body}) => {
            expect(body.code).to.eq(200);
            expect(body.message).to.eq(user.id)
        })
    })

    it("delete user", () => {
        cy.createUser(user.login);
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/user/${user.login}`,
        }).then(({body}) => {
            expect(body.code).to.eq(200);
            expect(body.message).to.eq(`${user.login}`)
        })
    })

})