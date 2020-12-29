import { element, by, ElementFinder } from 'protractor';

export class CuotaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cuota div table .btn-danger'));
  title = element.all(by.css('jhi-cuota div h2#page-heading span')).first();
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

export class CuotaUpdatePage {
  pageTitle = element(by.id('jhi-cuota-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  abono2019Input = element(by.id('field_abono2019'));
  abono2019QInput = element(by.id('field_abono2019Q'));
  fecha2019QInput = element(by.id('field_fecha2019Q'));
  abono2020Input = element(by.id('field_abono2020'));
  abono2020QInput = element(by.id('field_abono2020Q'));
  fecha2020QInput = element(by.id('field_fecha2020Q'));

  asociadoSelect = element(by.id('field_asociado'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getAbono2019Input(): ElementFinder {
    return this.abono2019Input;
  }

  async setAbono2019QInput(abono2019Q: string): Promise<void> {
    await this.abono2019QInput.sendKeys(abono2019Q);
  }

  async getAbono2019QInput(): Promise<string> {
    return await this.abono2019QInput.getAttribute('value');
  }

  async setFecha2019QInput(fecha2019Q: string): Promise<void> {
    await this.fecha2019QInput.sendKeys(fecha2019Q);
  }

  async getFecha2019QInput(): Promise<string> {
    return await this.fecha2019QInput.getAttribute('value');
  }

  getAbono2020Input(): ElementFinder {
    return this.abono2020Input;
  }

  async setAbono2020QInput(abono2020Q: string): Promise<void> {
    await this.abono2020QInput.sendKeys(abono2020Q);
  }

  async getAbono2020QInput(): Promise<string> {
    return await this.abono2020QInput.getAttribute('value');
  }

  async setFecha2020QInput(fecha2020Q: string): Promise<void> {
    await this.fecha2020QInput.sendKeys(fecha2020Q);
  }

  async getFecha2020QInput(): Promise<string> {
    return await this.fecha2020QInput.getAttribute('value');
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

export class CuotaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cuota-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cuota'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
