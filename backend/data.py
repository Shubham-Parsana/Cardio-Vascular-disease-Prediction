import pandas as pd
import matplotlib.pyplot as plt
import sklearn
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


# Load the Data
df = pd.read_csv("cardio_train.csv", sep=";")


# Spliting data set into features and target variable
x_cardio = df.drop("cardio", axis=1)
y_cardio = df["cardio"]

x_train, x_test, y_train, y_test = train_test_split(
    x_cardio, y_cardio, test_size=0.2, random_state=42
)

# inspecting the data
print("x_train (features for training) , 4_rows:")
print(x_train.head(4))

print("y_train (labels for training) , 4_rows:")
print(y_train.head(4))

print("x_test (features for testing) , 2_rows:")
print(x_test.head(2))

print("y_test (labels for testing) , 2_rows:")
print(y_test.head(2))

# How dataset is indexed
df.index

# information about the dataset
df.info()

# number of rows and columns in the dataset
df.shape
df.columns
df.sample(5)

df.describe()

df.describe(include="object")

df.isnull().sum()

df.duplicated().sum()

df["cardio"].value_counts()

sns.boxplot(x="cardio", y="age", data=df)
plt.show()

df["age"] = df["age"] / 365

sns.boxplot(x="cardio", y="age", data=df)
plt.show()

sns.boxplot(x="cardio", y="height", data=df)
plt.show()

plt.figure(figsize=(10, 6))
plt.hist(df["age"], bins=30, color="blue", alpha=0.7)
plt.title("Distribution of Age")
plt.xlabel("Age")
plt.ylabel("Frequency")
plt.show()

df["age"].hist(bins=30, figsize=(10, 6), color="blue", alpha=0.7)

df["cardio"].value_counts().plot(kind="bar", color=["blue", "orange"])

# sort values
df.sort_values(by="age", ascending=False).head(10)

# linear regression model
model = LinearRegression()

# fitting the model
model.fit(x_train, y_train)

# making predictions
y_pred = model.predict(x_test)

# evaluating the model
mse = sklearn.metrics.mean_squared_error(y_test, y_pred)

# plotting the results
plt.plot(y_test, y_pred)
plt.xlabel("Actual values")
plt.ylabel("Predicted values")
plt.title("Actual vs Predicted Values")
plt.show()

plt.scatter(y_test, y_pred)
