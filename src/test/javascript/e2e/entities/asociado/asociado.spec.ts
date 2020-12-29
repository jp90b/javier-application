import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AsociadoComponentsPage, AsociadoDeleteDialog, AsociadoUpdatePage } from './asociado.page-object';

const expect = chai.expect;

describe('Asociado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let asociadoComponentsPage: AsociadoComponentsPage;
  let asociadoUpdatePage: AsociadoUpdatePage;
  let asociadoDeleteDialog: AsociadoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Asociados', async () => {
    await navBarPage.goToEntity('asociado');
    asociadoComponentsPage = new AsociadoComponentsPage();
    await browser.wait(ec.visibilityOf(asociadoComponentsPage.title), 5000);
    expect(await asociadoComponentsPage.getTitle()).to.eq('prueb0AsociadosApp.asociado.home.title');
    await browser.wait(ec.or(ec.visibilityOf(asociadoComponentsPage.entities), ec.visibilityOf(asociadoComponentsPage.noResult)), 1000);
  });

  it('should load create Asociado page', async () => {
    await asociadoComponentsPage.clickOnCreateButton();
    asociadoUpdatePage = new AsociadoUpdatePage();
    expect(await asociadoUpdatePage.getPageTitle()).to.eq('prueb0AsociadosApp.asociado.home.createOrEditLabel');
    await asociadoUpdatePage.cancel();
  });

  it('should create and save Asociados', async () => {
    const nbButtonsBeforeCreate = await asociadoComponentsPage.countDeleteButtons();

    await asociadoComponentsPage.clickOnCreateButton();

    await promise.all([
      asociadoUpdatePage.setNombreInput('nombre'),
      asociadoUpdatePage.setApellidosInput('apellidos'),
      asociadoUpdatePage.setEmailInput('email'),
    ]);

    expect(await asociadoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await asociadoUpdatePage.getApellidosInput()).to.eq('apellidos', 'Expected Apellidos value to be equals to apellidos');
    expect(await asociadoUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    const selectedAcciones = asociadoUpdatePage.getAccionesInput();
    if (await selectedAcciones.isSelected()) {
      await asociadoUpdatePage.getAccionesInput().click();
      expect(await asociadoUpdatePage.getAccionesInput().isSelected(), 'Expected acciones not to be selected').to.be.false;
    } else {
      await asociadoUpdatePage.getAccionesInput().click();
      expect(await asociadoUpdatePage.getAccionesInput().isSelected(), 'Expected acciones to be selected').to.be.true;
    }
    const selectedBonos = asociadoUpdatePage.getBonosInput();
    if (await selectedBonos.isSelected()) {
      await asociadoUpdatePage.getBonosInput().click();
      expect(await asociadoUpdatePage.getBonosInput().isSelected(), 'Expected bonos not to be selected').to.be.false;
    } else {
      await asociadoUpdatePage.getBonosInput().click();
      expect(await asociadoUpdatePage.getBonosInput().isSelected(), 'Expected bonos to be selected').to.be.true;
    }

    await asociadoUpdatePage.save();
    expect(await asociadoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await asociadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Asociado', async () => {
    const nbButtonsBeforeDelete = await asociadoComponentsPage.countDeleteButtons();
    await asociadoComponentsPage.clickOnLastDeleteButton();

    asociadoDeleteDialog = new AsociadoDeleteDialog();
    expect(await asociadoDeleteDialog.getDialogTitle()).to.eq('prueb0AsociadosApp.asociado.delete.question');
    await asociadoDeleteDialog.clickOnConfirmButton();

    expect(await asociadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
