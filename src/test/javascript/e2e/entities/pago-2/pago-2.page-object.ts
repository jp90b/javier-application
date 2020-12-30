import { element, by, ElementFinder } from 'protractor';

export class Pago2ComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pago-2 div table .btn-danger'));
  title = element.all(by.css('jhi-pago-2 div h2#page-heading span')).first();
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

export class Pago2UpdatePage {
  pageTitle = element(by.id('jhi-pago-2-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  cantidad2Input = element(by.id('field_cantidad2'));
  fecha2Input = element(by.id('field_fecha2'));

  asociadoSelect = element(by.id('field_asociado'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCantidad2Input(cantidad2: string): Promise<void> {
    await this.cantidad2Input.sendKeys(cantidad2);
  }

  async getCantidad2Input(): Promise<string> {
    return await this.cantidad2Input.getAttribute('value');
  }

  async setFecha2Input(fecha2: string): Promise<void> {
    await this.fecha2Input.sendKeys(fecha2);
  }

  async getFecha2Input(): Promise<string> {
    return await this.fecha2Input.getAttribute('value');
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

export class Pago2DeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pago2-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pago2'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
