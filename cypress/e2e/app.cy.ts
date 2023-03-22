const website = 'http://localhost:3000';

describe('Smoke Test', () => {
  it('should re-route root calls to /works', () => {
    cy.visit(website);
    cy.url().should('include', '/works');
  });

  it('should render the nav bar with `Work` and `About`', () => {
    cy.visit(website);
    cy.get('.header--site_nav').contains('About');
    cy.get('.header--site_nav').contains('Work');
  });

  it('should render 4 projects', () => {
    cy.visit(website);
    cy.get('.works--cards-list').find('li').should('have.length', 4);
  });

  it('should have 4 footer links', () => {
    cy.visit(website);
    cy.get('.footer--link_holder').find('li').should('have.length', 4);
  });
});

const testCases = [
  {
    containingText: 'Unsequenced',
    url: '/unsequenced'
  },
  {
    containingText: 'S3-UI',
    url: '/simple-storage-service-ui'
  },
  {
    containingText: 'NY Times',
    url: '/top-stories'
  }, {
    containingText: 'Fine Art',
    url: '/fine-art-portfolio'
  }
];

describe('Links connect to appropriate pages', () => {
  testCases.forEach(({ containingText, url }) => {
    it(`should go to the proper url for ${containingText}`, () => {
      cy.visit(website);
      cy.contains(containingText).click();
      cy.url().should('include', url);
    });
  });
});

describe('Each page should link back to works', () => {
  testCases.forEach(({ containingText, url }) => {
    it(`${containingText} page should link back to /works`, () => {
      cy.visit(`${website}/works${url}/`);
      cy.get('.header--site_nav').contains('Work').click();
      cy.url().should('not.include', url);
    });
  });
});

describe('About page', () => {
  it('should navigate to `About` page on click', () => {
    cy.visit(website);
    cy.get('.header--site_nav').contains('About').click();
    cy.url().should('include', '/about/');
  });

  it('should render page title, image, text, links, and navigates back', () => {
    cy.visit(`${website}/about`);
    cy.get('.about--title').contains('About me');
    cy.get('canvas');
    cy.get('.about--sub_text').contains('Instinctually, I am a designer');
    cy.get('.about--body_text').contains('This impulse also drives me');
    cy.get('.about--links-cta').contains('Let\'s Connect');
    cy.get('.about--link_holder').find('li').should('have.length', 4);
    cy.get('.header--site_nav').contains('Work').click();
    cy.url().should('include', '/works');
  });
});

describe('Header actions', () => {
  it('Header hides/reveals on scroll', () => {
    cy.visit(`${website}/works`);
    cy.get('.header--title').should('be.visible');
    cy.get('.header--small_title').should('not.be.visible');
    cy.scrollTo('bottom');
    cy.get('.header--small_title').should('be.visible');
  });
});

export { };