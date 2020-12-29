import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CuotaComponentsPage, CuotaDeleteDialog, CuotaUpdatePage } from './cuota.page-object';

const expect = chai.expect;

describe('Cuota e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cuotaComponentsPage: CuotaComponentsPage;
  let cuotaUpdatePage: CuotaUpdatePage;
  let cuotaDeleteDialog: CuotaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cuotas', async () => {
    await navBarPage.goToEntity('cuota');
    cuotaComponentsPage = new CuotaComponentsPage();
    await browser.wait(ec.visibilityOf(cuotaComponentsPage.title), 5000);
    expect(await cuotaComponentsPage.getTitle()).to.eq('prueb0AsociadosApp.cuota.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cuotaComponentsPage.entities), ec.visibilityOf(cuotaComponentsPage.noResult)), 1000);
  });

  it('should load create Cuota page', async () => {
    await cuotaComponentsPage.clickOnCreateButton();
    cuotaUpdatePage = new CuotaUpdatePage();
    expect(await cuotaUpdatePage.getPageTitle()).to.eq('prueb0AsociadosApp.cuota.home.createOrEditLabel');
    await cuotaUpdatePage.cancel();
  });

  it('should create and save Cuotas', async () => {
    const nbButtonsBeforeCreate = await cuotaComponentsPage.countDeleteButtons();

    await cuotaComponentsPage.clickOnCreateButton();

    await promise.all([
      cuotaUpdatePage.setAbono2019QInput('5'),
      cuotaUpdatePage.setFecha2019QInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      cuotaUpdatePage.setAbono2020QInput('5'),
      cuotaUpdatePage.setFecha2020QInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      cuotaUpdatePage.asociadoSelectLastOption(),
    ]);

    const selectedAbono2019 = cuotaUpdatePage.getAbono2019Input();
    if (await selectedAbono2019.isSelected()) {
      await cuotaUpdatePage.getAbono2019Input().click();
      expect(await cuotaUpdatePage.getAbono2019Input().isSelected(), 'Expected abono2019 not to be selected').to.be.false;
    } else {
      await cuotaUpdatePage.getAbono2019Input().click();
      expect(await cuotaUpdatePage.getAbono2019Input().isSelected(), 'Expected abono2019 to be selected').to.be.true;
    }
    expect(await cuotaUpdatePage.getAbono2019QInput()).to.eq('5', 'Expected abono2019Q value to be equals to 5');
    expect(await cuotaUpdatePage.getFecha2019QInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecha2019Q value to be equals to 2000-12-31'
    );
    const selectedAbono2020 = cuotaUpdatePage.getAbono2020Input();
    if (await selectedAbono2020.isSelected()) {
      await cuotaUpdatePage.getAbono2020Input().click();
      expect(await cuotaUpdatePage.getAbono2020Input().isSelected(), 'Expected abono2020 not to be selected').to.be.false;
    } else {
      await cuotaUpdatePage.getAbono2020Input().click();
      expect(await cuotaUpdatePage.getAbono2020Input().isSelected(), 'Expected abono2020 to be selected').to.be.true;
    }
    expect(await cuotaUpdatePage.getAbono2020QInput()).to.eq('5', 'Expected abono2020Q value to be equals to 5');
    expect(await cuotaUpdatePage.getFecha2020QInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecha2020Q value to be equals to 2000-12-31'
    );

    await cuotaUpdatePage.save();
    expect(await cuotaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cuotaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cuota', async () => {
    const nbButtonsBeforeDelete = await cuotaComponentsPage.countDeleteButtons();
    await cuotaComponentsPage.clickOnLastDeleteButton();

    cuotaDeleteDialog = new CuotaDeleteDialog();
    expect(await cuotaDeleteDialog.getDialogTitle()).to.eq('prueb0AsociadosApp.cuota.delete.question');
    await cuotaDeleteDialog.clickOnConfirmButton();

    expect(await cuotaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
