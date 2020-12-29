import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Pago1ComponentsPage, Pago1DeleteDialog, Pago1UpdatePage } from './pago-1.page-object';

const expect = chai.expect;

describe('Pago1 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pago1ComponentsPage: Pago1ComponentsPage;
  let pago1UpdatePage: Pago1UpdatePage;
  let pago1DeleteDialog: Pago1DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pago1s', async () => {
    await navBarPage.goToEntity('pago-1');
    pago1ComponentsPage = new Pago1ComponentsPage();
    await browser.wait(ec.visibilityOf(pago1ComponentsPage.title), 5000);
    expect(await pago1ComponentsPage.getTitle()).to.eq('prueb0AsociadosApp.pago1.home.title');
    await browser.wait(ec.or(ec.visibilityOf(pago1ComponentsPage.entities), ec.visibilityOf(pago1ComponentsPage.noResult)), 1000);
  });

  it('should load create Pago1 page', async () => {
    await pago1ComponentsPage.clickOnCreateButton();
    pago1UpdatePage = new Pago1UpdatePage();
    expect(await pago1UpdatePage.getPageTitle()).to.eq('prueb0AsociadosApp.pago1.home.createOrEditLabel');
    await pago1UpdatePage.cancel();
  });

  it('should create and save Pago1s', async () => {
    const nbButtonsBeforeCreate = await pago1ComponentsPage.countDeleteButtons();

    await pago1ComponentsPage.clickOnCreateButton();

    await promise.all([
      pago1UpdatePage.setCantidad1Input('5'),
      pago1UpdatePage.setFecha1Input('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      pago1UpdatePage.asociadoSelectLastOption(),
    ]);

    expect(await pago1UpdatePage.getCantidad1Input()).to.eq('5', 'Expected cantidad1 value to be equals to 5');
    expect(await pago1UpdatePage.getFecha1Input()).to.contain('2001-01-01T02:30', 'Expected fecha1 value to be equals to 2000-12-31');

    await pago1UpdatePage.save();
    expect(await pago1UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pago1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Pago1', async () => {
    const nbButtonsBeforeDelete = await pago1ComponentsPage.countDeleteButtons();
    await pago1ComponentsPage.clickOnLastDeleteButton();

    pago1DeleteDialog = new Pago1DeleteDialog();
    expect(await pago1DeleteDialog.getDialogTitle()).to.eq('prueb0AsociadosApp.pago1.delete.question');
    await pago1DeleteDialog.clickOnConfirmButton();

    expect(await pago1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
