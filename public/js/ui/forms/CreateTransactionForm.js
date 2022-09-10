/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
			if (response && response.success) {
        const accountsSelectList = this.element.querySelector(".accounts-select");
				accountsSelectList.innerHTML = "";
				response.data.forEach((item) => {
					accountsSelectList.innerHTML += `<option value="${item.id}">${item.name}</option>`;
				})
			}
		});
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if(resp && resp.success) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        this.element.reset();
        App.update();
      }
    });
  }
}