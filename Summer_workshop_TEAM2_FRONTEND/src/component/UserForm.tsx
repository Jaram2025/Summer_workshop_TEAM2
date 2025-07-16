// src/components/UserForm/UserForm.tsx

import React, { useState } from 'react';
import styles from './UserForm.module.css';
import type { UserFormData } from '../type/type';
interface UserFormProps {
    onSubmit: (data: UserFormData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [birthday, setBirthday] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [job, setJob] = useState<string>('');
    const [relationship, setRelationship] = useState<string>('');
    const [budgetMin, setBudgetMin] = useState<number>(0);
    const [budgetMax, setBudgetMax] = useState<number>(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData: UserFormData = { birthday, gender, age, job, relationship, budget_min: budgetMin, budget_max: budgetMax };

        // 부모 컴포넌트로부터 전달받은 onSubmit 함수를 호출하여 데이터를 전달합니다.
        onSubmit(formData);
    };

    return (
    <div className={styles.container}>
      <h2>정보 입력</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
          <label htmlFor="birthdayInput" className={styles.label}>
            생일:
          </label>
          <input
            type="date"
            id="birthdayInput"
            className={styles.inputField}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="생일을 입력하세요"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="genderInput" className={styles.label}>
            성별:
          </label>
          <select
            id="genderInput"
            className={styles.inputField}
            onChange={(e) => setGender(e.target.value)}
            required>
            <option value=""> ---고르세요---</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
            <option value="선택 안함">선택 안함</option>
        </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="ageInput" className={styles.label}>
            나이:
          </label>
          <input
            type="number"
            min="0"
            id="ageInput"
            className={styles.inputField}

            onChange={(e) => {
              console.log("check");
              const v = parseInt(String(e.target.value));
              if(!Number.isNaN(v)) setAge(v);
              //else setAge(undefined);
              }
            }
            placeholder="나이를 입력하세요"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="jobInput" className={styles.label}>
            직업:
          </label>
          <input
            type="text"
            id="jobInput"
            className={styles.inputField}
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="직업을 입력하세요"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="relationshipInput" className={styles.label}>
            관계:
          </label>
          <select
            id="relationshipInput"
            className={styles.inputField}
            onChange={(e) => setRelationship(e.target.value)}
            required>
            <option value=""> ---고르세요---</option>
            <option value="연인">연인</option>
            <option value="친구">친구</option>
            <option value="가족(부모님)">가족(부모님)</option>
            <option value="가족(형제, 자매)">가족(형제, 자매)</option>
            <option value="직장 동료">직장 동료</option>
            <option value="기타">기타</option>
        </select>
        </div>
          <div className={styles.inputGroup}>
              <label htmlFor="budgetInput" className={styles.label}>
                  예산:
              </label>
              <span className={styles.budgetField}>
              <input
                  type="number"
                  min="0"
                  id="budgetMinInput"
                  className={styles.budgetInputField}

                  onChange={(e) => {
                      const v = parseInt(String(e.target.value));
                      if(!Number.isNaN(v)) setBudgetMin(v);
                  }
                  }
                  placeholder="최솟값"
                  required
              />
                  <span className={styles.budgetInputSpan}>~
                  </span>
              <input
                  type="number"
                  min="0"
                  id="budgetMaxInput"
                  className={styles.budgetInputField}

                  onChange={(e) => {
                      const v = parseInt(String(e.target.value));
                      if(!Number.isNaN(v)) setBudgetMax(v);
                  }
                  }
                  placeholder="최댓값"
                  required
              />
              </span>

          </div>

        <button type="submit" className={styles.submitButton}>
          정보 제출
        </button>
      </form>
    </div>
    );
};

export default UserForm;