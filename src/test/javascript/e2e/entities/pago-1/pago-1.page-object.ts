import { element, by, ElementFinder } from 'protractor';

export class Pago1ComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pago-1 div table .btn-danger'));
  title = element.all(by.css('jhi-pago-1 div h2#page-heading span')).first();
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

export class Pago1UpdatePage {
  pageTitle = element(by.id('jhi-pago-1-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  cantidad1Input = element(by.id('field_cantidad1'));
  fecha1Input = element(by.id('field_fecha1'));

  asociadoSelect = element(by.id('field_asociado'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCantidad1Input(cantidad1: string): Promise<void> {
    await this.cantidad1Input.sendKeys(cantidad1);
  }

  async getCantidad1Input(): Promise<string> {
    return await this.cantidad1Input.getAttribute('value');
  }

  async setFecha1Input(fecha1: string): Promise<void> {
    await this.fecha1Input.sendKeys(fecha1);
  }

  async getFecha1Input(): Promise<string> {
    return await this.fecha1Input.getAttribute('value');
  }

  async asociadoSelectLastOption(): Promise<void> {
    await this.asociadoSelect.all(by.tagName('option')).last().click();
  }

  async asociadoSelectOption(option: string): Promise<void> {
    await this.asociadoSelect.sendKeys(option);
  }

  getAsociadoSelect(): ElementFinder {
    return this.asociadoSelect;
  }

  async getAsociadoSelectedOption(): Promise<string> {
    return await this.asociadoSelect.element(by.css('option:checked')).getText();
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

export class Pago1DeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pago1-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pago1'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
