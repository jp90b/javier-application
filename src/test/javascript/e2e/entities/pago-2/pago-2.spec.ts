import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Pago2ComponentsPage, Pago2DeleteDialog, Pago2UpdatePage } from './pago-2.page-object';

const expect = chai.expect;

describe('Pago2 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pago2ComponentsPage: Pago2ComponentsPage;
  let pago2UpdatePage: Pago2UpdatePage;
  let pago2DeleteDialog: Pago2DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pago2s', async () => {
    await navBarPage.goToEntity('pago-2');
    pago2ComponentsPage = new Pago2ComponentsPage();
    await browser.wait(ec.visibilityOf(pago2ComponentsPage.title), 5000);
    expect(await pago2ComponentsPage.getTitle()).to.eq('prueb0AsociadosApp.pago2.home.title');
    await browser.wait(ec.or(ec.visibilityOf(pago2ComponentsPage.entities), ec.visibilityOf(pago2ComponentsPage.noResult)), 1000);
  });

  it('should load create Pago2 page', async () => {
    await pago2ComponentsPage.clickOnCreateButton();
    pago2UpdatePage = new Pago2UpdatePage();
    expect(await pago2UpdatePage.getPageTitle()).to.eq('prueb0AsociadosApp.pago2.home.createOrEditLabel');
    await pago2UpdatePage.cancel();
  });

  it('should create and save Pago2s', async () => {
    const nbButtonsBeforeCreate = await pago2ComponentsPage.countDeleteButtons();

    await pago2ComponentsPage.clickOnCreateButton();

    await promise.all([
      pago2UpdatePage.setCantidad2Input('5'),
      pago2UpdatePage.setFecha2Input('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      pago2UpdatePage.asociadoSelectLastOption(),
    ]);

    expect(await pago2UpdatePage.getCantidad2Input()).to.eq('5', 'Expected cantidad2 value to be equals to 5');
    expect(await pago2UpdatePage.getFecha2Input()).to.contain('2001-01-01T02:30', 'Expected fecha2 value to be equals to 2000-12-31');

    await pago2UpdatePage.save();
    expect(await pago2UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pago2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Pago2', async () => {
    const nbButtonsBeforeDelete = await pago2ComponentsPage.countDeleteButtons();
    await pago2ComponentsPage.clickOnLastDeleteButton();

    pago2DeleteDialog = new Pago2DeleteDialog();
    expect(await pago2DeleteDialog.getDialogTitle()).to.eq('prueb0AsociadosApp.pago2.delete.question');
    await pago2DeleteDialog.clickOnConfirmButton();

    expect(await pago2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
