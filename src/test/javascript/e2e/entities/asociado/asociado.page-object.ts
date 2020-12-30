import { element, by, ElementFinder } from 'protractor';

export class AsociadoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-asociado div table .btn-danger'));
  title = element.all(by.css('jhi-asociado div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AsociadoUpdatePage {
  pageTitle = element(by.id('jhi-asociado-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreInput = element(by.id('field_nombre'));
  apellidosInput = element(by.id('field_apellidos'));
  emailInput = element(by.id('field_email'));
  accionesInput = element(by.id('field_acciones'));
  bonosInput = element(by.id('field_bonos'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setApellidosInput(apellidos: string): Promise<void> {
    await this.apellidosInput.sendKeys(apellidos);
  }

  async getApellidosInput(): Promise<string> {
    return await this.apellidosInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  getAccionesInput(): ElementFinder {
    return this.accionesInput;
  }

  getBonosInput(): ElementFinder {
    return this.bonosInput;
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AsociadoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-asociado-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-asociado'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
