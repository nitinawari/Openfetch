"use client"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useState, useEffect } from "react"
import { BsThreeDots } from "react-icons/bs";
import { TbPencil } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

interface Category {
  id: string,
  name: string
}
export const CategoryList = () => {

  const [category, setCategory] = useState<Category[]>([])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])
  const fetchCategories = async () => {
    setIsFetching(true)
    try {
      const res = await fetch("/api/categories")
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || "Failed to load categories");
      }

      setCategory(result.data)
      // console.log(result.data)

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load categories"
      );
    } finally {
      setIsFetching(false)
    }
  }

  const HandleSubmit = async () => {
    if (!inputValue.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const newCategory = await saveCategory(inputValue);
      setCategory((prev) => [...prev, newCategory])
      setInputValue("");
      setError("")
      setIsAdding(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const saveCategory = async (value: string) => {
    const res = await fetch("/api/categories",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ categoryName: value })
      }
    )

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.message || "failed to create category")
    }

    return result.data;
  }

  const HandleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategory(prev =>
        prev.filter(category => category.id !== id)
      )
      setActiveMenuId(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "something went wrong")
    }
  }
  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE"
    }
    )
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "failed to delete category")
    }

    return result.data;

  }

  return (
    <div className="h-full w-80 p-4 bg-white border-r">
      <h1 className="font-bold text-center mb-4">Categories</h1>
      {isFetching && (
        <p className="text-sm text-gray-500">Loading categories…</p>
      )}
      <div className="space-y-2">
        {category.map((cat) => (
          <div key={cat.id} className="relative">
            <Button
              className="w-full"
              variant="outline"
            >
              <div className="flex items-center justify-between w-full px-2">
                <span>{cat.name}</span>
                <BsThreeDots
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(
                      activeMenuId === cat.id ? null : cat.id
                    )
                  }}
                />
              </div>
            </Button>

            {/* deleting /editing dialbox */}
            {activeMenuId === cat.id &&
              <div className="absolute left-100 top-2 mt-1 z-50 w-36 rounded-md border border-gray-200 bg-white shadow-lg py-1 space-y-1 ">
                <Button
                  variant="outline"
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <TbPencil className="h-5 w-5" />
                  <p className="ml-1">
                    Rename
                  </p>
                </Button>
                <Button
                  className=" flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 "
                  variant="outline"
                  onClick={() => HandleDelete(cat.id)}
                >
                  <MdDelete className="h-5 w-5 " />
                  <p className="ml-1">
                    Delete
                  </p>
                </Button>
              </div>
            }
          </div>
        ))}
      </div>

      <div className="mt-4">
        {isAdding ? (
          <div className="space-y-2">
            <Input
              autoFocus
              placeholder="category name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isCreating}
            />
            {error &&
              <FormError message={error} />
            }
            <div className="flex gap-2">
              <Button
                className=""
                variant="default"
                onClick={HandleSubmit}
                disabled={isCreating}
              >
                {isCreating ? "saving ..." : "save"}
              </Button>

              <Button
                className="outline"
                onClick={() => {
                  setIsAdding(false);
                  setInputValue("")
                  setError(null)
                }
                }
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </div>) : (
          <Button
            className="mt-2"
            onClick={() => {
              setIsAdding(true)
              setActiveMenuId(null);
            }
            }
          >
            create new +
          </Button>
        )
        }
      </div>
    </div>
  )

}
